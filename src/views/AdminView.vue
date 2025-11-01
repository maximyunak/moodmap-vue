<script setup>
import { onMounted, ref } from 'vue'
import { $fetch } from '@/utils/fetch.js'

// отзывы
const created = ref([])
const modal = ref(false)
const active = ref()

const onEdit = (id) => {
  modal.value = true
  active.value = id
}

created.value = (await $fetch('/feedbacks/created')).data

const saveStatus = async (event) => {
  const res = await $fetch(`/feedbacks/${active.value}/status`, 'post', new FormData(event.target))
  if (!res.data.errors) {
    modal.value = false
    created.value = (await $fetch('/feedbacks/created')).data
  }
}

// локации
const locations = ref([])
locations.value = (await $fetch('/locations')).data

const modalLocation = ref(false)
const activeLocation = ref()

const editLocation = (id) => {
  modalLocation.value = true
  activeLocation.value = id
}

const submitLocation = async (event) => {
  document.querySelectorAll('.error').forEach((e) => e.remove())

  const res = await $fetch(`/locations/${activeLocation.value}`, 'post', new FormData(event.target))

  if (res.data.errors) {
    for (const location of res.data.errors) {
      const input = document.querySelector(`input[name=${location}]`)
      input.setCustomValidity(true)
      input.insertAdjacentHTML('afterend', `<div class="error">${res.data.errors[location]}</div>`)
    }
  } else {
    locations.value = (await $fetch('/locations')).data
    modal.value = false
  }
}

// создание локи
const createLocationModal = ref(false)

const createLocation = async (event) => {
  const res = await $fetch('/locations', 'post', new FormData(event.target))

  if (res.data.errors) {
    for (const location of res.data.errors) {
      const input = document.querySelector(`input[name=${location}]`)
      input.setCustomValidity(true)
      input.insertAdjacentHTML('afterend', `<div class="error">${res.data.errors[location]}</div>`)
    }
  } else {
    createLocationModal.value = false
    locations.value = (await $fetch('/locations')).data
  }
}
</script>

<template>
  <div>
    <h2>Админ панель</h2>
    <h3>Отзывы со статусом CREATED</h3>
    <div class="cards">
      <div class="card" v-for="item in created" :key="item?.id">
        <h3>{{ item?.id }}. {{ item?.emotion }}</h3>
        <p>{{ item?.comment }}</p>
        <p>status: {{ item?.status }}</p>
        <button @click="onEdit(item?.id)">Изменить статус</button>
      </div>
    </div>
    <form
      @submit.prevent="saveStatus"
      class="modal form"
      :class="{
        active: modal,
      }"
    >
      <div class="form-block">
        <label>Изменить статус</label>
        <select name="status" id="status">
          <option value="APPROVED">Опубликовано</option>
          <option value="DECLINED">Отклонено</option>
        </select>
      </div>
      <input type="hidden" value="patch" name="_method" />
      <button>Сохранить</button>
    </form>
    <div
      class="modal_container"
      @click="modal = false"
      :class="{
        active: modal,
      }"
    ></div>

    <h2>Локации</h2>
    <div class="cards">
      <div class="card" v-for="location in locations" :key="location.id">
        <h3>{{ location?.name }}</h3>
        <p>{{ location.latitude }}, {{ location.longitude }}</p>
        <button @click="editLocation(location.id)">Изменить локацию</button>
      </div>
    </div>

    <form @submit.prevent="submitLocation" class="modal form" :class="{ active: modalLocation }">
      <div class="form-block">
        <label for="form_name">Название</label>
        <input type="text" placeholder="название локации" name="name" />
      </div>
      <div class="form-block">
        <label for="">Широта</label>
        <input type="text" placeholder="Широта" name="latitude" />
      </div>
      <div class="form-block">
        <label for="">Долгота</label>
        <input type="text" placeholder="Долгота" name="longitude" />
      </div>
      <input type="hidden" value="patch" name="_method" />
      <button>Сохранить</button>
    </form>
    <div
      class="modal_container"
      @click="modalLocation = false"
      :class="{
        active: modalLocation,
      }"
    ></div>

    <h2>Создание локации</h2>

    <button @click="createLocationModal = true">Создать локацию</button>
    <form
      @submit.prevent="createLocation"
      class="modal form"
      :class="{ active: createLocationModal }"
    >
      <div class="form-block">
        <label for="form_name">Название</label>
        <input type="text" placeholder="название локации" name="name" />
      </div>
      <div class="form-block">
        <label for="">Широта</label>
        <input type="text" placeholder="Широта" name="latitude" />
      </div>
      <div class="form-block">
        <label for="">Долгота</label>
        <input type="text" placeholder="Долгота" name="longitude" />
      </div>
      <button>Сохранить</button>
    </form>
    <div
      class="modal_container"
      @click="createLocationModal = false"
      :class="{
        active: createLocationModal,
      }"
    ></div>
  </div>
</template>
