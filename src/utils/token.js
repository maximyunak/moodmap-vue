import { ref } from 'vue'

export const store = ref({
  token: localStorage.getItem('token') ?? null,
  user: JSON.parse(localStorage.getItem('user')) ?? null,
})

export const setToken = (token) => {
  localStorage.setItem('token', token)
  store.value.token = token
}

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  store.value.user = user
}
