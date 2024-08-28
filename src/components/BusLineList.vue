<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  lineList: number[],
}

const props = defineProps<Props>()
const emit = defineEmits(['selectLine'])

</script>

<template>
  <ul>
    <li v-for="lineItem of props.lineList" :key="lineItem">
      <button @click="emit('selectLine', lineItem)">{{ lineItem }}</button>
    </li>
  </ul>
</template>
