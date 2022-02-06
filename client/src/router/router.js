import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Auth from '../components/Auth.vue'
import Register from '../components/Register.vue'
import Chat from '../components/Chat.vue'
import NotFound from '../components/NotFound.vue'

import store from '../store/store'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },

  {
    name: 'auth',
    path: '/auth',
    component: Auth,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '/register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: '/chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(localStorage.getItem('token') != null){
    store.dispatch('auth', true)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.auth) {
      next()
    } else {
      next('/auth')
    }
    
  } else {
    if (store.getters.auth) {
      next('/chat')
    } else {
      next()
    }
  }
})

export default router

