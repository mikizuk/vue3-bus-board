<script setup lang="ts">
import { defineProps } from 'vue';
import ItemList from "./ItemList.vue";

interface Props {
  times: string[],
}

const props = defineProps<Props>()

</script>
<template>
  <h4 class="px-4 py-2 h6 w-fit ">Time</h4>
  <div v-if="props.times.length">
    <ItemList
      :items="props.times"
      :selectable="false"
    />
  </div>
  <div v-else>No items</div>
</template>