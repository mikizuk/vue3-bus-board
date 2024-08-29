import { createStore, Commit } from "vuex";
import { timeToInt } from "../utils";
import { BusStop, fetchData, SortOrder } from "../api/buses";

export interface BusState {
  busData: BusStop[] | null;
  error: string | null;
  loading: boolean;
  selectedBusLine: number | null;
  selectedBusStop: string | null;
  busStopOrder: SortOrder;
}

const state: BusState = {
  busData: null,
  error: null,
  loading: false,
  selectedBusLine: null,
  selectedBusStop: null,
  busStopOrder: 'asc'
};

const getters = {
  getBusStops(state: BusState): string[] {
    return [...new Set(state.busData?.map((item: BusStop) => item.stop))];
  },
  getBusLines(state: BusState): number[] {
    return [...new Set(state.busData?.map((item: BusStop) => item.line).sort((a,b) => a - b))];
  },
  isError(state: BusState): boolean {
    return !!state.error;
  },
  isLoading(state: BusState): boolean {
    return state.loading;
  },
  //
  getSelectedLineStops(state: BusState): string[] {
    const lineStops = state.busData
      ?.filter((stop: BusStop) => stop.line === state.selectedBusLine)
      .sort((a: BusStop, b: BusStop) => state.busStopOrder === 'asc'
        ? a.stop.localeCompare(b.stop)
        : b.stop.localeCompare(a.stop)
      )
      .map((stop: BusStop) => stop.stop);
    return [...new Set(lineStops)] || [];
  },
  getSelectedStopTimes(state: BusState): string[] {
    const busLineStops = state.busData
      ?.filter((stop: BusStop) => stop.line === state.selectedBusLine)
      .filter((stop: BusStop) => stop.stop === state.selectedBusStop)
      .sort((a: BusStop, b: BusStop) => timeToInt(a.time) - timeToInt(b.time))
      .map((stop: BusStop) => stop.time)

    return busLineStops || [];
  }
};

const mutations = {
  setLoading(state: BusState, loading: boolean) {
    state.loading = loading;
  },
  setBusData(state: BusState, busData: BusStop[]) {
    state.busData = busData;
  },
  setError(state: BusState, error: string) {
    state.error = error;
  },
  //
  setSelectedBusLine(state: BusState, line: number) {
    state.selectedBusLine = line;
  },
  setSelectedBusStop(state: BusState, stop: string) {
    state.selectedBusStop = stop;
  },
  setBusStopOrder(state: BusState, order: SortOrder) {
    state.busStopOrder = order
  }
};

const actions = {
  async fetchBusLines({ commit }: { commit: Commit }) {    
    try {
      commit("setLoading", true);
      const data: BusStop[] = await fetchData();
      commit("setBusData", data);
    } catch (e: unknown) {
      console.error("Error while fetch:", (e as Error).message);
      commit("setError", (e as Error).message);
    } finally {
      commit("setLoading", false);
    }
  },
  selectBusLine({ commit }: { commit: Commit }, payload: number) {
    commit("setSelectedBusLine", payload);
    commit("setBusStopOrder", 'asc');
  },
  selectBusStop({ commit }: { commit: Commit }, payload: string) {
    commit("setSelectedBusStop", payload)
  },
  changeBusStopOrder({ commit }: { commit: Commit }) {
    if (state.busStopOrder === 'desc') {
      commit("setBusStopOrder", 'asc')
    } else {
      commit("setBusStopOrder", 'desc')
    }
  },
  deselectBusStop({ commit }: { commit: Commit}) {
    commit("setSelectedBusStop", null)
  }

};

export default createStore({
  state,
  getters,
  mutations,
  actions,
});
