<script setup>
import { onMounted, ref } from 'vue'
import { $fetch } from '@/utils/fetch.js'
import router from '@/router/index.js'

const modal = ref(false)

const locations = ref()
locations.value = (await $fetch('/locations')).data

const submit = async (event) => {
  const res = await $fetch('/feedbacks', 'post', new FormData(event.target))
  if (res?.data?.errors) {
    for (let key in res?.data?.errors) {
      const field = document.querySelector(`[name="${key}"]`)

      field.insertAdjacentHTML('afterend', `<div class="error">${res?.data?.errors[key]}</div>`)
      field.setCustomValidity(true)
    }
  } else {
    router.push('/profile')
  }
}

onMounted(() => {
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity('')))
})
</script>

<template>
  <div>
    <h2>Список всех локаций</h2>
    <div class="cards">
      <div class="card" v-for="location in locations" :key="location.id">
        <h3>{{ location?.name }}</h3>
        <p>{{ location.latitude }}, {{ location.longitude }}</p>
        <button @click="modal = true">Оставить отзыв</button>
        <form @submit.prevent="submit" class="form modal" :class="{ active: modal }">
          <h2>Оставить отзыв</h2>
          <div class="form-block">
            <label for="form-emotion">Эмоция</label>
            <select name="emotion" id="emotion-select">
              <option value="SAD">sad</option>
              <option value="ANGRY">angry</option>
              <option value="HAPPY">happy</option>
            </select>
          </div>
          <div class="form-block">
            <label for="comment">Комментарий</label>
            <input type="text" placeholder="Комментарий" name="comment" />
          </div>
          <input type="hidden" name="location_id" :value="location?.id" />
          <button>Сохранить</button>
        </form>
        <div class="modal_container" :class="{ active: modal }" @click="modal = false"></div>
      </div>
    </div>
  </div>
</template>
