import { computed, ref } from 'vue'

export const store = ref({
  token: localStorage.getItem('token') ?? null,
})

const setToken = (token) => {
  localStorage.setItem('token', token)
  store.value.token = token
}
