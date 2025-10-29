<script setup>
const submit = () => {}
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
