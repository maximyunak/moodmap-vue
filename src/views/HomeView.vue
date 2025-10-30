<script setup>
import { $fetch } from '@/utils/fetch'
import { store } from '@/utils/token'
import { computed, ref } from 'vue'

const token = computed(() => store.value.token)

const feedbacks = ref([])

feedbacks.value = (await $fetch('/feedbacks')).data.items
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

  <section id="contact">
    <h2>Свяжитесь с нами</h2>
    <form @submit.prevent="">
      <div class="form-block">
        <label for="form-phone">Номер телефона</label>
        <input type="text" placeholder="Номер телефона" />
      </div>
      <div class="form-block">
        <label for="form-name">Имя</label>
        <input type="text" placeholder="Имя" />
      </div>
      <div class="form-block">
        <label for="form-message">Сообщение</label>
        <textarea type="text" placeholder="Номер телефона" />
      </div>
      <button type="submit">Связаться</button>
    </form>
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
