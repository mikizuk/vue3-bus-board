<script setup lang="ts">
import store from "@/store/index";
import BusLineList from "@/components/BusLineList.vue";
import BusStopsComponent from "@/components/BusStopsComponent.vue";
import TimeScheduleComponent from "@/components/TimeScheduleComponent.vue";

const onSelectLine = (line: number) => store.dispatch("selectBusLine", line);
</script>

<template>
  <BusLineList
    :lineList="store.getters.getBusLines"
    @selectLine="onSelectLine"
  />

  <div class="row gap-4 mx-0">
    <div v-if="store.state.selectedBusLine" class="col bg-white rounded px-0">
      <!-- <div class="p-3"> -->
      <h3 class="h5 p-4">Bus line: {{ store.state.selectedBusLine }}</h3>
      <BusStopsComponent :busStops="store.getters.getSelectedLineStops" />
      <!-- </div> -->
    </div>
    <div v-else class="col bg-light rounded dotted-border">
      <p>Please select the bus line first</p>
    </div>
    <div v-if="store.state.selectedBusStop" class="col bg-white rounded px-0">
      <h3 class="h5 p-4">Bus stop: {{ store.state.selectedBusStop }}</h3>
      <TimeScheduleComponent :times="store.getters.getSelectedStopTimes" />
    </div>
    <div v-else class="col bg-light rounded dotted-border">
      <p v-if="!store.state.selectedBusLine">
        Please select the bus line first
      </p>
      <p v-else-if="!store.state.selectedBusStop">
        Please select the bus stop first
      </p>
    </div>
  </div>
</template>
