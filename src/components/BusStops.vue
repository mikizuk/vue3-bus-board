<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import store from "@/store/index";
import SortIcon from "@/icons/sort-icon.vue";

interface Props {
  items: string[],
}

const props = defineProps<Props>()
const emit = defineEmits(['onSelectItem'])
const onClick = (newItem: string): void => {
  emit('onSelectItem', newItem)
}
const onChangeOrder = (): void => {
  store.dispatch("changeBusStopOrder");
};
</script>

<template>
  <h4 class="px-4 py-4 h6 w-fit pointer" @click="onChangeOrder">Bus stops ({{ store.state.busStopOrder }}) <SortIcon /></h4>
  <ul class="list-group list-unstyled">
    <li v-for="item of props.items" :key="item" class="">
      <span
        class="list-group-item px-4 py-3"
        :class="{'active': item === store.state.selectedBusStop}"
        @click="onClick(item)">
        {{ item }}
      </span>
    </li>
  </ul>
</template>
