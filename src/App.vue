<script setup lang="ts">
import { onMounted } from 'vue';
import store from '@/store/index'

onMounted(async () => {
  store.dispatch('fetchBusLines')
})
</script>

<template>
  <header>
    <h1>Timetable</h1>
    <div>
      <RouterLink to="/">Bus Lines</RouterLink>
      |
      <RouterLink to="/stops">Stops</RouterLink>
    </div>
  </header>
  <main>
    <div v-if="(store.getters.isLoading)">
      loading..........
    </div>
    <div v-else-if="store.getters.isError">
      Error: {{ store.state.error }}
    </div>
    <div v-else>
      <RouterView />
    </div>
  </main>
</template>