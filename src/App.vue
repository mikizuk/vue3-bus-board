<script setup lang="ts">
import { onMounted } from "vue";
import store from "@/store/index";
import LoadSpinner from "./components/LoadSpinner.vue";

onMounted(async () => {
  store.dispatch("fetchBusLines");
});
</script>

<template>
  <div class="container-xxl pt-5">
    <header >
      <h1 class="h1 mb-2">Timetable</h1>
      <nav class="nav nav-tabs my-4 px-3 bg-white rounded">
        <div class="nav-item">
            <RouterLink class="nav-link text-dark py-3 font-weight-bold" to="/">Bus Lines</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link text-dark py-3 font-weight-bold" to="/stops">Stops</RouterLink>
        </div>
      </nav>
    </header>
    <main>
      <LoadSpinner v-if="store.getters.isLoading" />
      <div v-else-if="store.getters.isError">
        <p>Error: {{ store.state.error }}</p>
      </div>
      <div v-else >
        <RouterView />
      </div>
    </main>
  </div>
</template>
