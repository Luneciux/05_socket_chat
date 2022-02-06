<script>
  export default {
    name: 'App',
    
  }
</script>

<template>
  <router-view />
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  @media (min-height: 800px) {  
    html {
      height: 100%;
    }
  }

  body {
    height: 100%;
    background: linear-gradient(
      180deg, 
      rgb(37, 48, 59) 0%, 
      rgb(37, 48, 59) 29%,
      rgb(32, 43, 56) 29%
      
    );
  }


</style>
