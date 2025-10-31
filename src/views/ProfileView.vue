<script setup>
import { $fetch } from '@/utils/fetch'
import { store } from '@/utils/token'
import { computed, onMounted, ref } from 'vue'

const user = computed(() => store.value.user)
const myFeedbacks = ref([])
myFeedbacks.value = (await $fetch('/feedbacks/my')).data

const modal = ref(false)
const active = ref()

const submit = async (event) => {
  const res = await $fetch(`/feedbacks/${active.value}`, 'post', new FormData(event.target))

  if (res.data.errors) {
    for (const key in res.data.errors) {
      const field = document.querySelector(`name[${key}]`)
      field.insertAdjacentHTML('afterbegin', `<div>${res.data.errors[key]}</div>`)
      field.setCustomValidity(true)
    }
  } else {
    myFeedbacks.value = (await $fetch('/feedbacks/my')).data
    modal.value = false
  }
}

const onEdit = (id) => {
  modal.value = true
  active.value = id
}

onMounted(() => {
  document.querySelectorAll('input').forEach((e) => (e.onchange = () => e.setCustomValidity('')))
})
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
    <div v-for="item in myFeedbacks" :key="item.id">
      <div class="card">
        <h3>{{ item?.id }}. {{ item?.emotion }}</h3>
        <p>{{ item?.comment }}</p>
        <p>status: {{ item?.status }}</p>
        <button @click="onEdit(item?.id)" v-if="item?.status === 'APPROVED'">
          Отредактировать
        </button>
        <form
          id="feedback"
          class="modal"
          @submit.prevent="submit"
          :class="{
            active: modal,
          }"
        >
          <div class="form-block">
            <label for="form-emotion"> Эмоция </label>

            <select name="emotion" id="form-emotion">
              <option value="SAD">SAD</option>
              <option value="ANGRY">ANGRY</option>
              <option value="HAPPY">HAPPY</option>
            </select>
          </div>
          <div class="form-block">
            <label for="form-commetn">Комментарий</label>
            <input type="text" placeholder="Комментарий" />
          </div>
          <input type="hidden" :value="item?.id" name="id" />
          <input type="hidden" value="PATCH" name="_method" />

          <button>Отредактировать</button>
        </form>
      </div>
    </div>
    <div
      @click="modal = false"
      class="modal_container"
      :class="{
        active: modal,
      }"
    ></div>
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
