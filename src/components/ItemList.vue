<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface Props {
  items: string[],
  selectable: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['onSelectItem'])
const selectedItem = ref('');
const onClick = (newItem: string): void => {
  selectedItem.value = newItem;
  emit('onSelectItem', newItem)
}
</script>

<template>
  <ul class="list-group list-unstyled cart-height">
    <li v-for="item of [... new Set(props.items)]" :key="item" >
      <span
        class="list-group-item px-4 py-3"
        :class="{'active': props.selectable && (item === selectedItem)}"
        @click="onClick(item)">
        {{ item }}
      </span>
    </li>
  </ul>
</template>
