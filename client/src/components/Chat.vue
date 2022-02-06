<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <div class="header-bar header-room" />
            <div class="rooms">
              <div class="field">              
                <input 
                  class="input search-room"  
                  v-model="search" 
                  type="text" 
                  placeholder="Search room" 
                  @keypress="found"
                  @keyup="found"
                >                            
              </div>
              <div class="container-rooms">
                <div class="field create-room-field" v-if="admin">              
                  <input 
                    class="input create-room-input"  
                    v-model="newRoom" 
                    type="text" 
                    placeholder="Create room"
                    v-on:keyup.enter="createNewRoom(newRoom)"
                  >
                  <button 
                    class="button create-room-button is-primary" 
                    type="submit" 
                    @click="createNewRoom(newRoom)"
                  >Add</button>                           
                </div>              
                <div v-if="searchRooms">
                  <div class="room" v-if="loadRooms">
                    <div
                      class="room-text"
                      v-for="(room, index) in foundRooms"
                      @click="loadRoom(room)"
                      v-bind:key="index"
                    >
                      <span class="room-name-span">{{ room.name }}</span>
                      <div 
                        class="delete-span-container" 
                        v-if="admin"
                      > <span class="delete-span" @click="deleteRoom(room._id)">x</span></div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="room" v-if="loadRooms">
                    <div
                      class="room-text"
                      v-for="(room, index) in rooms"
                      @click="loadRoom(room)"
                      v-bind:key="index"
                    >
                      <span class="room-name-span">{{ room.name }}</span>
                      <div 
                        class="delete-span-container" 
                        v-if="admin"
                      > <span class="delete-span" @click="deleteRoom(room._id)">x</span></div>
                    </div>
                  </div>
                  <div class="room" v-else>
                    <div class="room-text">
                      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="column chat">
            <div class="header-bar header-chat">
              <div class="column is-10 room-text-container">
                <span class="active-chat-name" v-if="loadChat">{{ activeRoom.name }}</span>
              </div>
              
              <div class="column is-2 logout-container">
                <button class="button is-primary button-logout" @click="logout" >Logout</button>
              </div>
              
            </div>
            <div class="container-chat">
              <div class="chat-container" v-if="!loadChat" >
                Clica no Chat porra !!!!!!!!!!!!
              </div>
              <div class="chat-container" v-else>
                <ChatContent :socket="socket"/>
              </div>
            </div>
            <div class="container-chat-input" v-if="loadChat">
              <ChatInput :socket="socket"/>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script>

  import { 
    getUser, 
    getRooms, 
    createRoom,
    deleteRoom,
    deleteMessages
  } from '../services/api'

  import { mapGetters } from 'vuex'

  import router from '../router/router'

  import ChatContent from './ChatContent.vue'
  import ChatInput from './ChatInput.vue'

  import io from 'socket.io-client'

  export default {
    name:'Chat',

    data: function() {
      return {
        socket: io('http://localhost:8000',  { transports : ['websocket'] }),
        rooms: null,
        loadRooms: false,
        loadChat: false,
        searchRooms: false,
        activeRoom: null,
        foundRooms: [],
        search: '',
        admin: false,
        newRoom: null,
      }
    },

    created: async function() {
      getUser(localStorage.getItem('userId'))

      this.rooms = await getRooms(localStorage.getItem('token'))
      setInterval(() => {this.loadRooms = true}, 1000)

      if(this.$store.state.user.roles[0] == "admin"){
        this.admin = true
      }

      this.socket.on('update rooms', async (msg) => { 
        this.loadRooms = false
        
        this.rooms = await getRooms(localStorage.getItem('token'))

        setInterval(() => {this.loadRooms = true}, 500)
        this.loadRooms = true

        if(msg.act == 'deleted' && msg.room == this.activeRoom._id){
          this.activeRoom = null
          router.go()
        }
      })

    },

    computed:  {
      ...mapGetters(['user']),
      
        found() {

          this.foundRooms = []

          if(this.search != ''){
            this.searchRooms = true
            this.rooms.find( room => {
              if (
                room.name.toLowerCase().indexOf( this.search.toLowerCase() ) != -1 
              ) { 
                this.foundRooms.push(room)
              }
            })

            if(this.foundRooms.length == 0){
              this.foundRooms = [{name: 'Nothing found :/'}]
            }

          } else {
            this.searchRooms = false
          }

        },


    },

    methods: {
      logout() {
        localStorage.clear()

        this.socket.emit('disconnected', this.$store.state.user)
        
        router.go()
      },

      loadRoom(room) {
        this.activeRoom = room
        this.loadChat = true

        this.socket.emit('new room connected', room)
        this.$store.state.room = room;
      },

      async createNewRoom(newRoom){

        this.newRoom = null

        if(newRoom != null){
          const sendRoom = { name: newRoom }
          const response = await createRoom(localStorage.getItem('token'), sendRoom)

          this.socket.emit('update rooms', { act: 'new', room: response._id })
        }

      },

      async deleteRoom(roomId){
        
        const response = await deleteRoom(localStorage.getItem('token'), roomId)
        const response_msg = await deleteMessages(localStorage.getItem('token'), roomId)
        
        console.log(response, response_msg)
        this.socket.emit('update rooms', { act: 'deleted', room: roomId})
      },

    },

    components: {
      ChatContent,
      ChatInput
    },

    
  }

</script>


<style scoped>

  .columns{
    height: 90vh;
    box-shadow: 0 3rem -1rem rgba(10, 10, 10, .2);
  }

  .rooms{
    min-height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    height: calc(100% - 50px);
    background-color: rgb(69, 79, 94);
    border-bottom-left-radius: 5px;
  }

  .chat{
    background-color: rgb(53, 63, 78); 
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  .container-rooms{
    height: calc(100% - 50px - 0.75rem);
    overflow-y: auto;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
  }

  .container-rooms::-webkit-scrollbar {
    width: 7px;
  }

  .container-rooms::-webkit-scrollbar-track {
    background-color: rgb(74, 91, 117);
    border-radius: 100px;
  }

  .container-rooms::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: rgba(49, 216, 152, 0.562);
  }

  .container-chat{
    height: calc(94% - 50px);
    overflow-y: auto;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
  }

  .container-chat::-webkit-scrollbar {
    width: 7px;
  }

  .container-chat::-webkit-scrollbar-track {
    background-color: rgb(74, 91, 117);
    border-radius: 100px;
  }

  .container-chat::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 2px solid transparent;
    background-clip: content-box;
    background-color: rgba(49, 216, 152, 0.562);
  }


  .column{
    padding: 0;
  }

  .header-bar{
    margin: 0;
    height: 50px;
    background-color: rgb(69, 89, 117);
  }

  .active-chat-name {
    display: flex;
    line-height: 50px;
    margin-left: 25px;
    font-weight: 600;
    color: aliceblue;
    align-self: flex-start;
  }

  .header-chat {
    border-top-right-radius: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .logout-container{
    padding-top: 5px;
    padding-left: 35px;
  }

  .header-room {
    border-top-left-radius: 5px;
  }

  .room-text{
    width: 100%;
    padding: 20px 0px 20px 30px;
    display: flex;
    align-content: flex-start;
    font-weight: 400;
    color: aliceblue;
    font-family: 'Roboto';
  }

  .room-text:hover{
    background-color: rgb(41, 51, 65);
    cursor: pointer;
    transition: 0.5s;
  }

  .create-room-field{
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0px 10px 0px 17px;
  }

  .create-room-input{
    margin-right: 10px;
  }
  
  .input{
    width: 90%;
    background-color: #4f5f6e;
    border: none;
    color: white;
  }

  .search-room{
    margin-top: 10px; 
  }

  .delete-span{
    font-family: 'Roboto';
    width: 20px;
    height: 20px;
    margin-right: 10px;
    display: flex;
    align-self: center;
    
    align-items: center;
    justify-self: center;
    justify-content: center;
    border-radius: 100%;
    background-color: #4f5f6e;
    color: aquamarine;
  }

  .delete-span:hover{
    background-color: #3b4752;
  }

  .delete-span-container{
    width: 80%;
    
    display: flex;
    
    align-items: center;
    justify-content: end;
    justify-self: end;
  }

  .room-name-span{
    width: 100%;
    display: flex;
    justify-content: start;
  }

  .input::placeholder{
    color: rgb(49, 216, 152);
  }

  .input:focus{
    outline: none!important;
    box-shadow: none;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    margin: 4px;
    border: 4px solid rgb(49, 216, 152);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(49, 216, 152) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-height: 800px) {
    section{
      height: 100vh;
    }
  }



</style>
