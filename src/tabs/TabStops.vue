<script setup lang="ts">
import store from '@/store/index'
import { ref, computed } from 'vue';

const searchQuery = ref('');

const filteredLocations = computed(() => {
  const query = searchQuery.value.toLowerCase();

  // console.info('query:', query,
  //   '??', store.getters.getBusStops
  // );
  return store.getters.getBusStops.filter((location: string) =>
    location.toLowerCase().includes(query)
  );
});


</script>

<template>
      <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search locations..." 
      class="search-input"
    />
  <hr>
  {{ filteredLocations }}
  <!-- <hr> -->
  <!-- {{ store.getters.getBusStops }} -->
</template>