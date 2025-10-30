<script setup>
import { $fetch } from '@/utils/fetch'
import { setToken, setUser } from '@/utils/token'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const submit = async (event) => {
  const res = await $fetch('/auth/login', 'post', new FormData(event.target))
  document.querySelectorAll('.error').forEach((e) => e.remove())

  console.log(res?.data)

  if (res?.data?.errors || res?.error) {
    for (let name in res.data.errors) {
      const input = document.querySelector(`input[name=${name}]`)

      input.insertAdjacentHTML('afterend', `<div class="error">${res.data.errors[name]}</div>`)
      input.setCustomValidity(true)
    }
  } else {
    setToken(res?.credentials)
    setUser(res?.data)
    router.push('/')
  }
}

onMounted(() =>
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity(''))),
)
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-block">
        <label for="form-email">Email</label>
        <input type="text" name="email" />
      </div>
      <div class="form-block">
        <label for="form-password">Пароль</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Войти</button>
      <RouterLink to="/register">Нет аккаунта? Зарегестрироваться</RouterLink>
    </form>
  </div>
</template>
