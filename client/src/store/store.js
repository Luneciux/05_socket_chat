import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: {},
    room: {},
    auth: false
  },

  actions: {
    user(context, user) {
      context.commit('user', user)
    },

    auth(context, auth) {
      context.commit('auth', auth)
    },

    room(context, room) {
      context.commit('room', room)
    }
  },

  mutations: {  
    user(state, user) {
      state.user = user
    },

    auth(state, auth) {
      state.auth = auth
    },

    room(state, room) {
      state.room = room
    }
  },  

  getters: {
    user: (state) => {
      return state.user
    },

    auth: (state) => {
      return state.auth
    }
  }

})

export default store

