<script setup>
import { $fetch } from '@/utils/fetch'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const submit = async (event) => {
  const password = event.target.password
  const repeat = event.target.repeat
  if (password.value !== repeat.value) {
    repeat.insertAdjacentHTML('afterend', `<div class="error">Введенные пароли не совпадают</div>`)
    password.setCustomValidity(true)
    return
  }

  const res = await $fetch('/auth/register', 'post', new FormData(event.target))

  if (res?.data?.errors) {
    for (let name in res.data.errors) {
      const input = document.querySelector(`input[name=${name}]`)

      input.insertAdjacentHTML('afterend', `<div class="error">${res.data.errors[name]}</div>`)
      input.setCustomValidity(true)
    }
  } else {
    router.push('/login')
  }
}
onMounted(() =>
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity(''))),
)
</script>

<template>
  <div class="auth">
    <form @submit.prevent="submit">
      <h2>Регистрация</h2>
      <div class="form-block">
        <label for="register-last_name">Фамилия</label>
        <input type="text" name="last_name" placeholder="last name" />
      </div>
      <div class="form-block">
        <label for="register-first_name">Имя</label>
        <input type="text" name="first_name" placeholder="first name" />
      </div>
      <div class="form-block">
        <label for="register-patronymic">Отчество</label>
        <input type="text" name="patronymic" placeholder="patronymic" />
      </div>
      <div class="form-block">
        <label for="register-email">Email</label>
        <input type="text" name="email" placeholder="email" />
      </div>
      <div class="form-block">
        <label for="register-avatar">Аватарка</label>
        <input type="file" name="avatar" />
      </div>
      <div class="form-block">
        <label for="register-password">Пароль</label>
        <input type="password" name="password" placeholder="password" />
      </div>
      <div class="form-block">
        <label for="register-repeat-password">Повтор пароля</label>
        <input type="password" name="repeat" placeholder="repeat password" />
      </div>
      <button>Зарегистрироваться</button>
      <RouterLink to="/login">Есть аккаут? Войти</RouterLink>
    </form>
  </div>
</template>
