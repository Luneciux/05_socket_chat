<template>
  <div>
    <input class="input input-chat-border" v-model="message.content" type="text" placeholder="Write something..." v-on:keyup.enter="send"/>
  </div>
</template>

<script>

import { sendMessage } from '../services/api'

import { Socket } from 'socket.io-client'

export default {
  props: {
    socket: Socket
  },

  data: function(){
    return {
      message: {content: ""},
      //
    }
  },

  methods: {
    async send(){
      const response = await sendMessage(localStorage.getItem('token'), this.$store.state.room._id, this.message)
      if(response){

        this.socket.emit('new message', this.$store.state.room)

      }

      this.message.content = ''
    },
  }

}
</script>

<style>
  .input{
    width: 95%;
    background-color: #4f5f6e;
    border: none;
    color: white;
    padding-left: 30px;
  }

  .input-chat-border{
    height: 100%;
    border-radius: 50px;
  }

  .input::placeholder{
    color: rgb(49, 216, 152);
  }

  .input:focus{
    outline: none!important;
    box-shadow: none;
  }

</style>