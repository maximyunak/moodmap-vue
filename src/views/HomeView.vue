<script setup>
import { $fetch } from '@/utils/fetch'
import { store } from '@/utils/token'
import { computed, ref } from 'vue'

const token = computed(() => store.value.token)

const feedbacks = ref([])

feedbacks.value = (await $fetch('/feedbacks')).items

// console.log(feedbacks.value.items)

console.log(feedbacks)
</script>

<template>
  <header>
    <img src="" alt="logo" />
    <nav>
      <a href="#about">О нас</a>
      <a href="#contact">Свяжитесь с нами</a>
      <RouterLink to="/reviews">Отзывы</RouterLink>
      <RouterLink to="/login" v-if="!token">Войти</RouterLink>
      <RouterLink to="/register" v-if="!token">Регистрация</RouterLink>
      <RouterLink to="/profile" v-if="token">Личный кабинет</RouterLink>
    </nav>
  </header>

  <section id="about">
    <h2>О нас</h2>
    <p>Вы можете оставлять отзывы на разные локации с реакцией и комметарием</p>
  </section>

  <section id="reviews">
    <h2>Недавние отзывы</h2>
    <div v-for="feedback in feedbacks">{{ feedback?.id }} {{ feedback?.emotion }}</div>
  </section>

  <footer>
    <div>
      <img src="" alt="logo" />
      <a href="tel:+7 (999) 999 99-99">+7 (999) 999 99-99</a>
      <a href="mailto:support@moodmap.ru">support@moodmap.ru</a>
    </div>
    <p>© 2024 «MoodMap» - Все права защищены.</p>
  </footer>
</template>

<style scoped>
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

section {
  margin-top: 120px;

  h2 {
    margin-bottom: 20px;
  }
}

footer {
  margin-top: 60px;
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
