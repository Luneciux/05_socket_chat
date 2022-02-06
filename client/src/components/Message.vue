<template>
  <div class="column message-component">
    {{ this.message.content }}
  </div>
</template>

<script>
export default {
  props: {
    message: {}

  },

  data: function(){
    
    return{
    }
  }

}
</script>

<style>

  .message-component{
    color: white;
    display: flex;
    justify-items: start;
    background-color: rgb(74, 91, 117);
    border-radius: 10px;
    margin-top: 10px;
    padding: 2px;
}

</style>