<script setup lang="ts">
import store from "@/store/index";
import { defineProps } from 'vue';
import BusStops from "@/components/BusStops.vue";

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
    <BusStops
      :items="props.busStops"
      @onSelectItem="onSelectBusStop"
    />
  </div>
</template>