<script setup>
import { $fetch } from '@/utils/fetch'

const submit = async (event) => {
  const res = await $fetch('/auth/register', 'post', new FormData(event.target))
}
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="register-last_name">Фамилия</label>
        <input type="text" name="last_name" />
      </div>
      <div class="form-group">
        <label for="register-first_name">Имя</label>
        <input type="text" name="first_name" />
      </div>
      <div class="form-group">
        <label for="register-patronymic">Отчество</label>
        <input type="text" name="patronymic" />
      </div>
      <div class="form-group">
        <label for="register-email">Email</label>
        <input type="text" name="email" />
      </div>
      <div class="form-group">
        <label for="register-avatar">Аватарка</label>
        <input type="file" name="avatar" />
      </div>
      <div class="form-group">
        <label for="register-password">Пароль</label>
        <input type="password" name="password" />
      </div>
      <div class="form-group">
        <label for="register-repeat-password">Повтор пароля</label>
        <input type="password" name="repeat-password" />
      </div>
      <button>Зарегестрироваться</button>
      <RouterLink to="/login">Есть аккаут? Войти</RouterLink>
    </form>
  </div>
</template>
