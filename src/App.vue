<script setup>
import { computed } from 'vue'
import { store } from './utils/token'

const token = computed(() => store.value.token)
</script>

<template>
  <div class="container">
    <header v-if="$route.path !== '/login' && $route.path !== '/register'">
      <RouterLink to="/"><img src="" alt="logo" /></RouterLink>
      <nav>
        <router-link to="/#about">О нас</router-link>
        <router-link to="/#contact">Свяжитесь с нами</router-link>
        <RouterLink to="/feedbacks">Отзывы</RouterLink>
        <RouterLink to="/locations">Локации</RouterLink>
        <RouterLink to="/login" v-if="!token">Войти</RouterLink>
        <RouterLink to="/register" v-if="!token">Регистрация</RouterLink>
        <RouterLink to="/profile" v-if="token">Личный кабинет</RouterLink>
      </nav>
    </header>
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
    <footer v-if="$route.path !== '/register' && $route.path !== '/login'">
      <div>
        <img src="" alt="logo" />
        <a href="tel:+7 (999) 999 99-99">+7 (999) 999 99-99</a>
        <a href="mailto:support@moodmap.ru">support@moodmap.ru</a>
      </div>
      <p>© 2024 «MoodMap» - Все права защищены.</p>
    </footer>
  </div>
</template>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.v-enter-to,
.v-leave {
  opacity: 1;
  transform: translateY(0px);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
header {
  padding: 30px 0;
  display: flex;
  align-items: start;
  justify-content: space-between;
  nav {
    display: flex;
    gap: 30px;
  }
}
footer {
  margin-top: 60px;
  padding-bottom: 30px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
