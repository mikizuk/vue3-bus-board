<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import store from "@/store/index";

interface Props {
  lineList: number[],
}

const props = defineProps<Props>()
const emit = defineEmits(['selectLine'])
const onClick = (newItem: number): void => {
  emit('selectLine', newItem)
  store.dispatch('deselectBusStop')
}

</script>

<template>
  <div class="tab-content my-3 bg-white rounded p-4">
    <h3 class="h5">Select Bus Line</h3>
    <ul class="py-4 list-unstyled d-flex flex-wrap gap-2">
      <li v-for="lineItem of props.lineList" :key="lineItem">
        <button
          class="btn btn-primary"
          :class="{ 'active': lineItem === store.state.selectedBusLine}"
          @click="onClick(lineItem)">
          {{ lineItem }}
        </button>
      </li>
    </ul>
  </div>
</template>
