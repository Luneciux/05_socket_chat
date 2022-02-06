<template>
  <div class="main-container-format">
    <section class="section">
      <div class="container">
        <div class="columns">

          <div class="column is-5 aside-container">  
            <div class="columns vue-chat-logo">
              <div class="vue-chat-text">
                <p class="vue-text">Vue</p>
                <p class="chat-text">chat</p>
                <p class="chat-text-description-project">
                  A simple chat with Vue3 and Node.js
                </p>              
              </div>
            </div>
            <div class="columns vue-div-aside-buttons">
              <div class="column is-6 ">
                <button class="button is-primary is-outlined button-register-home" @click="this.$router.push('/register')">Register</button>
              </div>
              <div class="column is-6">
                <button class="button is-primary button-login-home" @click="this.$router.push('/auth')">Login</button>
              </div>
              
            </div>
          </div>

          <div class="column register-container">
            <div class="explication-container">
              <p class="explication-text-first">Chat with your friends!</p>
            </div>
            <div class="explication-text">
              <p>
                This app allow you to talk to anyone connected and chat in some room that has already been created by the system admin.
              </p>
            </div>
            <div class="columns tec-logos-container">
              <div class="column is-2 logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg" alt="logo-socket-io"></div>
              <div class="column is-2 logo"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="logo-node"></div>
              <div class="column is-2 logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="logo-vue"></div>
              <div class="column is-2 logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="logo-mongo"></div>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script>

  import { registerNewUser } from '../services/api'
  import router from '../router/router'

  export default {
    name: 'Register',
  }

</script>


<style scoped>

  .columns{
    max-height: 100%;
    box-shadow: 0 3rem -1rem rgba(10, 10, 10, .2);
  }

  .column{
    min-height: 80%;
    padding: 0;
  }

   .aside-container{
    color: white;
    background-color: rgb(69, 79, 94);
    border-radius: 10px;
    padding: 50px;
    height: 80vh;
  }

  .container{
    margin-top: 20px;
  }

  .register-container{
    color: rgb(51, 51, 51);
    background-color: transparent; 
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    display: block;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 140px 100px 100px 100px;
  }

  .vue-chat-text{
    display: block;
    align-content: start;
    align-items: start;
    justify-content: start;
    justify-items: start;
    padding-left: 10%;
  }

  .vue-chat-text-description-creation{
    display: flex;
    padding-top: 40%;
    align-content: end;
    align-items: end;
    justify-content: center;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-weight: 400;
    font-family: ''Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS'', sans-serif;
  }

  .instagram-link{
    text-decoration: none;
    color: rgb(49, 247, 171);
    font-weight: 400;
    font-size: 1.2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  
  .vue-text{
    color: rgb(74, 201, 158);
    font-weight: 900;
    font-size: 9em;
    font-family: 'Roboto', sans-serif;
    text-align: start;
    margin-top: 30px;
  }

  .chat-text{
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 4.5em;
    font-family: 'Arial', sans-serif;
    text-align: start;
    margin-left: 10%;
    margin-top: -40px;
  }

  .chat-text-description-project{
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-family: 'Arial', sans-serif;
    font-size: 1.5em;
    text-align: start;
    margin-top: 80px;
  }

  .input{
    margin-top: 10px;
    background-color: aliceblue;
    border: none;
  }

  .button-submit-login{
    width: 100%;
    margin-top: 40px;
    background-color: rgb(76, 199, 131);
    border-radius: 10px;
  }

  .explication-container{
    color: white;
    display: flex;
    justify-content: start;
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 60px;
    margin-top: 120px;
  }

  .button-div{
    border-top: 1px solid rgb(137, 151, 161);
    margin-top: 50px;
  }

  .login-link{
    margin-top: 30px;
    font-size: 15px;
  }

  .login-link-anchor{
    text-decoration: none;
    color: rgb(49, 247, 171);
  }

  .senha-repit{
    width: 100%;
    display: flex;
    justify-content: start;
    color: rgb(74, 201, 158);
    margin-bottom: -20px;
  }

  .room-disclaimer{
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 0.8em;
    color: rgb(255, 255, 255);
    
  }

  @media (max-height: 900px) {

    .vue-chat-text {
      height: 100vh;
      margin-top: 20px;
    }
    
  }

  .main-container-format{
    height: 100vh;
    width: 100%;
    background: linear-gradient(
      180deg, 
      rgb(37, 48, 59) 0%, 
      rgb(37, 48, 59) 29%,
      rgb(32, 43, 56) 29%
      
    );
  }

  .button-login-home{
    width: 70%;
  }
  .button-register-home{
    width: 70%;
  }

  .vue-div-aside-buttons{
    padding: 20px;
    margin-top: 50px;
  }

  .explication-text{
    color: white;
    text-align: justify;
    font-size: 1.5em;
  }

  .tec-logos-container{
    border-radius: 10px;
    background-color: white;
    margin-top: 60px;
    padding: 20px;
    justify-content: center;
    align-items: center;
  }

  .logo{
    margin: 20px;
  }


</style>
