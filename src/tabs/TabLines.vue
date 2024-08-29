<script setup lang="ts">
import store from "../store/index";
import BusLineList from "../components/BusLineList.vue";
import BusStopsCart from "../components/BusStopsCart.vue";
import TimeScheduleCart from "../components/TimeScheduleCart.vue";

const onSelectLine = (line: number) => store.dispatch("selectBusLine", line);
</script>

<template>
  <BusLineList
    :lineList="store.getters.getBusLines"
    @selectLine="onSelectLine"
  />

  <div class="row gap-4 mx-0">
    <div v-if="store.state.selectedBusLine" class="col bg-white rounded px-0">
      <h3 class="h5 p-4">Bus line: {{ store.state.selectedBusLine }}</h3>
      <BusStopsCart :busStops="store.getters.getSelectedLineStops" />
    </div>
    <div v-else class="col bg-light rounded dotted-border cart-height">
      <p>Please select the bus line first</p>
    </div>
    <div v-if="store.state.selectedBusStop" class="col bg-white rounded px-0">
      <h3 class="h5 p-4">Bus stop: {{ store.state.selectedBusStop }}</h3>
      <TimeScheduleCart :times="store.getters.getSelectedStopTimes" />
    </div>
    <div v-else class="col bg-light rounded dotted-border cart-height">
      <p v-if="!store.state.selectedBusLine">
        Please select the bus line first
      </p>
      <p v-else-if="!store.state.selectedBusStop">
        Please select the bus stop first
      </p>
    </div>
  </div>
</template>
