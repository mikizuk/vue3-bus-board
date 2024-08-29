<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import store from "../store/index";
import SortIcon from "../icons/SortIcon.vue";
import ItemList from "./ItemList.vue";

interface Props {
  items: string[],
  title: string,
  selectable: boolean,
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
  <h4 class="px-4 py-4 h6 w-fit pointer" @click="onChangeOrder">{{ props.title }} ({{ store.state.busStopOrder }}) <SortIcon /></h4>
  <ul class="list-group list-unstyled cart-height">
    <ItemList
      :items="props.items"
      @onSelectItem="onClick"
      :selectable="props.selectable"
    />
  </ul>
</template>
