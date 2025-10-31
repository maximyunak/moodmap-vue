<script setup>
import { $fetch } from '@/utils/fetch'
import { store } from '@/utils/token'
import { computed, ref } from 'vue'

const feedbacks = ref([])

feedbacks.value = (await $fetch('/feedbacks')).data.items.splice(0, 5)

const fade = ref(false)
const index = ref(0)

const animate = () => {
  fade.value = true

  setTimeout(() => (fade.value = false), 500)
}

const next = () => {
  index.value = (index.value + 1) % Math.min(feedbacks.value.length, 3)
  animate()
}

const prev = () => {
  index.value =
    (index.value - 1 + Math.min(feedbacks.value.length, 3)) % Math.min(feedbacks.value.length, 3)
  animate()
}
</script>

<template>
  <section id="about">
    <h2>О нас</h2>
    <p>Вы можете оставлять отзывы на разные локации с реакцией и комметарием</p>
  </section>

  <section id="reviews">
    <h2>Недавние отзывы</h2>
    <div class="slider">
      <button @click="prev" class="btn-nav"><</button>
      <div
        :class="{
          fade,
        }"
      >
        <div v-for="feedback in feedbacks.slice(index, index + 3)" class="card" :key="feedback.id">
          <p>{{ feedback?.id }}.</p>
          {{ feedback?.emotion }}
        </div>
      </div>
      <button @click="next" class="btn-nav">></button>
    </div>
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
</template>

<style scoped>
section {
  margin-top: 120px;

  h2 {
    margin-bottom: 20px;
  }
}
</style>
