<script setup lang="ts">
import store from "../store/index";
import { defineProps } from 'vue';
import SortableItemList from "./SortableItemList.vue";

interface Props {
  busStops: string[],
}

const props = defineProps<Props>()
const onSelectBusStop = (stop: string): void => {
  store.dispatch("selectBusStop", stop);
};
</script>
<template>
  <div v-if="props.busStops.length">
    <SortableItemList
      :items="props.busStops"
      :title="'Bus stops'"
      @onSelectItem="onSelectBusStop"
      :selectable="true"
    />
  </div>
  <div v-else>No items</div>
</template>