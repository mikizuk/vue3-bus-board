import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TabLines from './TabLines.vue';
import BusLineList from '../components/BusLineList.vue';
import BusStopsCart from '../components/BusStopsCart.vue';
import TimeScheduleCart from '../components/TimeScheduleCart.vue';
import store from '../store/index';

vi.mock('../store/index', () => {
  return {
    default: {
      state: {
        selectedBusLine: null,
        selectedBusStop: null,
      },
      getters: {
        getBusLines: [1, 2, 3],
        getSelectedLineStops: ['Stop A', 'Stop B'],
        getSelectedStopTimes: ['10:00', '11:00'],
      },
      dispatch: vi.fn(),
    },
  };
});

describe('TabLines.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clears any mocked function calls before each test
  });

  it('renders BusLineList component with correct props', () => {
    const wrapper = mount(TabLines);

    const busLineList = wrapper.findComponent(BusLineList);

    expect(busLineList.exists()).toBe(true);
    expect(busLineList.props('lineList')).toEqual([1, 2, 3]);
  });

  it('renders BusStopsCart and TimeScheduleCart based on store state', async () => {
    // Simulate the state where a bus line is selected
    store.state.selectedBusLine = 1;
    store.state.selectedBusStop = 'Stop A';

    const wrapper = mount(TabLines);

    // Check if BusStopsCart is rendered
    const busStopsCart = wrapper.findComponent(BusStopsCart);
    expect(busStopsCart.exists()).toBe(true);
    expect(busStopsCart.props('busStops')).toEqual(['Stop A', 'Stop B']);

    const timeScheduleCart = wrapper.findComponent(TimeScheduleCart);
    expect(timeScheduleCart.exists()).toBe(true);
    expect(timeScheduleCart.props('times')).toEqual(['10:00', '11:00']);
  });


  it('conditionally renders content based on state', async () => {

    const wrapperWithLine = mount(TabLines);
    expect(wrapperWithLine.text()).toContain('Bus line: 1');

    // Simulate the state where both bus line and bus stop are selected
    store.state.selectedBusStop = 'Stop A';
    const wrapperWithBoth = mount(TabLines);
    expect(wrapperWithBoth.text()).toContain('Bus line: 1');
    expect(wrapperWithBoth.text()).toContain('Bus stop: Stop A');
  });
});
