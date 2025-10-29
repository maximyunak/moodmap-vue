<script setup></script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition>
      <Suspense>
        <template #default>
          <div class="container">
            <component :is="Component" />
          </div>
        </template>
      </Suspense>
    </Transition>
  </RouterView>
</template>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.v-enter-to,
.v-leave {
  opacity: 1;
  transform: translateY(0px);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
