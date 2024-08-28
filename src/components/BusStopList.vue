<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  busStops: string[],
}

const props = defineProps<Props>()
const emit = defineEmits(['selectBusStop'])

</script>

<template>
  <ul>
    <li v-for="busStop of props.busStops" :key="busStop">
      <!-- <span style="border: 1px solid red;" @click="foo(busStop)">{{ busStop }}</span> -->
      <span style="border: 1px solid red;" @click="emit('selectBusStop', busStop)">{{ busStop }}</span>
    </li>
  </ul>
</template>
