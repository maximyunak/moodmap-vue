<script setup>
import { ref, watch } from 'vue'
import { $fetch } from '@/utils/fetch.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const feedbacks = ref([])

const get = async (search = '') => {
  feedbacks.value = (
    await $fetch('/feedbacks', 'get', {
      page: route.query.page || 1,
      location_id: search,
    })
  ).data
}

const debounceGet = (search) => {
  setTimeout(() => {
    get(search)
  }, 500)
}

get()
watch(
  () => route.query.page,
  () => get(),
)
</script>

<template>
  <div>
    <h2>Все отзывы</h2>
    <!--    <form @submit.prevent="submit">-->
    <div class="form-block">
      <label for="form-search">Поиск по номеру локации</label>
      <input @change="(e) => debounceGet(e.target.value)" type="text" placeholder="loaction_id" />
    </div>
    <!--    </form>-->
    <div class="cards">
      <div class="card" v-for="item in feedbacks.items" :key="item.id">
        <h3>{{ item?.id }}. {{ item?.emotion }}</h3>
        <p>{{ item?.comment }}</p>
      </div>
    </div>
    <div class="paginate">
      <RouterLink
        :to="`/feedbacks?page=${id + 1}`"
        :key="id"
        class="page"
        v-for="(_, id) in new Array(feedbacks.total_pages)"
        >{{ id + 1 }}</RouterLink
      >
    </div>
  </div>
</template>
