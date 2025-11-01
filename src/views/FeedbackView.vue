<script setup>
import { ref, watch } from 'vue'
import { $fetch } from '@/utils/fetch.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const feedbacks = ref([])

const get = async () => {
  feedbacks.value = (
    await $fetch('/feedbacks', 'get', {
      page: route.query.page || 1,
    })
  ).data
}

get()
watch(
  () => route.query.page,
  () => get(),
)
</script>

<template>
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
</template>
