<script setup>
import { ref } from 'vue'
import { $fetch } from '@/utils/fetch.js'

const feedbacks = ref([])
const activePage = ref(1)
const totalPage = ref(0)

const res = (await $fetch('/feedbacks')).data
feedbacks.value = res.items
totalPage.value = res.total_pages
</script>

<template>
  <div class="cards">
    <div class="card" v-for="item in feedbacks" :key="item.id">
      <h3>{{ item?.id }}. {{ item?.emotion }}</h3>
      <p>{{ item?.comment }}</p>
    </div>
  </div>
  <div class="paginate">
    <div class="page" v-for="(page, id) in new Array(totalPage)">{{ id + 1 }}</div>
  </div>
</template>
