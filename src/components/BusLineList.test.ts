import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SelectBusLine from './BusLineList.vue';
import store from '../store/index';

vi.mock('../store/index', () => {
  return {
    default: {
      state: {
        selectedBusLine: null,
      },
      dispatch: vi.fn(),
    },
  };
});

describe('SelectBusLine.vue', () => {
  const lineList = [1, 2, 3];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the list of bus lines', () => {
    const wrapper = mount(SelectBusLine, {
      props: { lineList },
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(lineList.length);

    lineList.forEach((line, index) => {
      expect(buttons[index].text()).toBe(line.toString());
    });
  });

  it('adds "active" class to the selected bus line button', async () => {
    store.state.selectedBusLine = 2;
    const wrapper = mount(SelectBusLine, {
      props: { lineList },
    });

    const activeButton = wrapper.find('button.active');
    expect(activeButton.text()).toBe('2');
  });

  it('emits "selectLine" and dispatches "deselectBusStop" on button click', async () => {
    const wrapper = mount(SelectBusLine, {
      props: { lineList },
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted().selectLine).toBeTruthy();
    expect(wrapper.emitted().selectLine[0]).toEqual([parseInt(button.text())]);

    expect(store.dispatch).toHaveBeenCalledWith('deselectBusStop');
  });
});
