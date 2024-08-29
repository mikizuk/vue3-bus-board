<script setup lang="ts">
import { ref, computed, ComputedRef, Ref } from "vue";
import store from "../store/index";
import SortableItemList from "../components/SortableItemList.vue";
import SearchIcon from "../icons/SearchIcon.vue";

const searchQuery: Ref<string> = ref("");

const filteredBusStops: ComputedRef<string[]> = computed((): string[] => {
  const query = searchQuery.value.toLowerCase();

  const sortedBusStops =
    store.state.busStopOrder === "asc"
      ? store.getters.getBusStops.sort((a: string, b: string) =>
          a.localeCompare(b)
        )
      : store.getters.getBusStops.sort((a: string, b: string) =>
          b.localeCompare(a)
        );

  return sortedBusStops.filter((location: string) =>
    location.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="col bg-white rounded cart-height">
    <div class="pt-4 px-3">
      <div class="custom-form-group">
        <input
          type="search"
          id="form1"
          class="form-control custom-form-control"
          placeholder="Search..."
          v-model="searchQuery"
        />
        <div v-show="!searchQuery" class="custom-form-icon">
          <SearchIcon />
        </div>
      </div>
    </div>

    <SortableItemList
      :items="filteredBusStops"
      :title="'Bus stops'"
      :selectable="false"
    />
  </div>
</template>