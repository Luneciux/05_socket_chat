<template>
  <div class="messages-div">
    <div v-for="(message, index) in messages" v-bind:key="index" >
      <Message :message="message"/>
    </div>
  </div>
  
</template>

<script>

import { loadMessages } from '../services/api'

import { Socket } from 'socket.io-client'

import Message from './Message.vue'

export default {

  props: {
    socket: Socket
  },

  data: function(){
    return {
      messages: {}

    }
  },

  created: async function(){
    this.socket.on('new room connected', async (room) => {
      if(this.$store.state.room._id == room._id){
        this.messages = await loadMessages(localStorage.getItem('token'), room._id)
      }

    })

    this.socket.on('new message', async (room) => {
      if(this.$store.state.room._id == room._id){
        this.messages = await loadMessages(localStorage.getItem('token'), room._id)
      }
    })
  },

  components: {
    Message,
  }

}
</script>

<style >
  .messages-div{
    padding: 20px 20px 20px 40px;
  }

</style>