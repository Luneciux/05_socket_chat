<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">

          <div class="column is-7 aside-container">  
            <div class="columns vue-chat-logo">
              <div class="vue-chat-text">
                <a href="javascript:void(0)" class="vue-main-link" @click="this.$router.push('/')"><p class="vue-text">Vue</p></a>
                <p class="chat-text">chat</p>
                <p class="chat-text-description-project">
                  A simple chat with Vue3 and Node.js
                </p>
              </div>
            </div>
            <div class="columns vue-chat-text-description-creation">
              <p class="vue-text-description-creation">
                Created with love by <a href="https://www.instagram.com/elielcosta_j/" target="blank" class="instagram-link">Josué Eliel</a>
              </p>
            </div>
          </div>

          <div class="column register-container">
            <div class="signup-container">
              <p class="signup-text">Sign Up</p>
            </div>
            <form action="" @submit="submit">
              <div class="field">
                <p class="room-disclaimer">
                  This name will be displayed in the rooms
                </p>
              </div>
              <div class="field">              
                  <input class="input" type="name" placeholder="Name" v-model="user.name" required>                            
              </div>
              <div class="field">              
                  <input class="input" type="email" placeholder="Email" v-model="user.email" required>                            
              </div>
              <div class="field"> 
                  <input class="input" type="password" placeholder="Password" v-model="user.password" required>  
              </div>
              <div class="field">
                <p class="senha-repit">
                  Confirm password
                </p>
              </div>
              <div class="field"> 
                  <input class="input" type="password" placeholder="Confirm Password" v-model="user.confirmPassword" required>   
              </div>
              <div class="field button-div">
                <button class="button is-success button-submit-login">
                  Register
                </button>
              </div>
            </form>
            <p class="login-link">
              Already registered? Use the
              <router-link to="/auth" class="login-link-anchor">
                <p>Login page</p>
              </router-link>
            </p>
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

    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          roles: ['user']
        }
      }
    },

    methods: {
      async submit(event) {
        event.preventDefault()

        if(this.user.password === this.user.confirmPassword) {
          try {

            const response = await registerNewUser(this.user)
            console.log(response, 'Register')
            router.push('/chat')

          } catch (err) {
            console.log(err)
            alert('Problema em registrar usuário')
          }
        } else {
          alert('Senhas Incompatíveis!') 
        }      
      }
    }
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
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 50px;
  }

  .container{
    margin-top: 20px;
  }

  .register-container{
    color: white;
    background-color: rgb(53, 63, 78); 
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
    margin-left: 5%;
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
    margin-left: 10%;
    margin-top: 80px;
  }

  .button-submit-login{
    width: 100%;
    margin-top: 40px;
    background-color: rgb(76, 199, 131);
    border-radius: 10px;
  }

  .signup-container{
    display: flex;
    justify-content: start;
    font-size: 3em;
    font-weight: 700;
    margin-bottom: 60px;
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
    font-size: 0.8em;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    margin-bottom: -10px;
  }

  .room-disclaimer{
    width: 100%;
    display: flex;
    justify-content: start;
    font-size: 0.8em;
    color: rgb(255, 255, 255);
    margin-left: 10px;
  }

  .input{
    margin-top: 10px;
    background-color: #4f5f6e;
    border: none;
    color: white;
  }

  .input::placeholder{
    color: rgb(49, 216, 152);
  }

  .input:focus{
    outline: none!important;
    box-shadow: none;
  }


  @media (max-height: 900px) {

    .vue-chat-text {
      height: 100vh;
      margin-top: 20px;
    }
    
  }


</style>
