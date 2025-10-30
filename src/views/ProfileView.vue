<script setup>
import { $fetch } from '@/utils/fetch'
import { store } from '@/utils/token'
import { computed, ref } from 'vue'

const user = computed(() => store.value.user)
const myFeedbacks = ref([])
myFeedbacks.value = (await $fetch('/feedbacks/my')).data
</script>

<template>
  <h2>Личный кабинет</h2>
  <img :src="user.avatar" alt="avatar" />
  <h3>{{ user?.id }}. {{ user?.first_name }} {{ user?.last_name }} {{ user?.patronymic }}</h3>

  <div class="cards">
    <div v-if="myFeedbacks.length === 0" class="nothing">
      <h2>Вы не оставили ни отдого отзыва</h2>
      <RouterLink to="/locations">Напишите свой первый отзыв</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nothing {
  justify-content: center;
  a {
    text-decoration: underline;
  }
}
</style>
