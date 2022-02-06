import axios from 'axios'
import store from '../store/store'

const _BaseUrl = 'http://localhost:8000'

const registerNewUser = async (user) => {
  const response = await axios.post(`${ _BaseUrl }/auth/register`, user)

  localStorage.setItem('token', response.data.token)
  localStorage.setItem('userId', response.data.user._id)

  store.dispatch('user', response.data.user)
  store.dispatch('auth', true)
  return response.data
}

const authenticateUser = async (user) => {
  const response = await axios.post(`${ _BaseUrl }/auth/authenticate`, user)

  localStorage.setItem('token', response.data.token)
  localStorage.setItem('userId', response.data.user._id)
  
  store.dispatch('user', response.data.user)
  store.dispatch('auth', true)
  return response.data
}

const getUser = async (userId) => {
  const response = await axios.get(`${ _BaseUrl }/auth/user/${userId}`)

  store.dispatch('user', response.data.user)
  store.dispatch('auth', true)
  return response.data
}

const getRooms = async (token) => {
  if(token){
    const response = await axios.get(`${ _BaseUrl }/chat/rooms`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    })
    
    return response.data.rooms
  }
}

const createRoom = async (token, room) => {
  if(token){
    const response = await axios.post(`${ _BaseUrl }/chat/createRoom`, room, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    })
    
    return response.data.room
  }
}
///chat/roomMessages/

const deleteRoom = async (token, roomId) => {
  if(token){
    const response = await axios.delete(`${ _BaseUrl }/chat/room/${ roomId }`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    })
    
    return response.data.removed_room
  }
}

const sendMessage = async (token, roomId, message) => {
  if(token){
    const response = await axios.post(`${ _BaseUrl }/chat/${ roomId }`, message,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
      }
    })
    
    return response.data.message
  }
}

const loadMessages = async (token, roomId) => {
  if(token){
    const response = await axios.get(`${ _BaseUrl }/chat/${ roomId }`,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
      }
    })

    return response.data.room_messages
  }
}

const deleteMessages = async (token, roomId) => {
  if(token){
    const response = await axios.delete(`${ _BaseUrl }/chat/roomMessages/${ roomId }`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    })
    
    return response.data.roomId
  }
}


export { 
  registerNewUser, 
  authenticateUser, 
  getUser,
  getRooms,
  createRoom,
  deleteRoom,
  sendMessage,
  loadMessages,
  deleteMessages
}