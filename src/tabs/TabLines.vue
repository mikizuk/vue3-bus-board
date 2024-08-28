<script setup lang="ts">
import store from "@/store/index";
import BusLineList from '@/components/BusLineList.vue'
import BusStopList from '@/components/BusStopList.vue'

const onSelectLine = (line: number) => {
  // console.info('onSelectLine', line);
  store.dispatch('selectBusLine', line)
}
const onSelectBusStop = (stop: string) => {
  // console.info('onSelectLineStop', stop);
  store.dispatch('selectBusStop', stop)
}
const onChangeOrder = () => {
  console.info('onChangeOrder', );
  store.dispatch('changeBusStopOrder')  
}

</script>

<template>
  <BusLineList
    :lineList=store.getters.getBusLines
    @selectLine="onSelectLine"
  />
  <hr>
  selectedLine:
  <div v-if="store.state.selectedBusLine">
  {{ store.state.selectedBusLine }}
  <br>
  <button @click="onChangeOrder">{{ store.state.busStopOrder }}</button>
  <br>
  & selectedBusStop: {{ store.state.selectedBusStop }}
  & selectedLineStops:
    <!-- {{ store.getters.getSelectedLineStops }} -->
      <div v-if="store.getters.getSelectedLineStops.length">
        <BusStopList
          :busStops="store.getters.getSelectedLineStops"
          @selectBusStop="onSelectBusStop"  
        />
      </div>
  </div>
  <hr>
  selectedLineStopTimes: {{ store.getters.getSelectedStopTimes }}
</template>
