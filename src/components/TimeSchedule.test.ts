import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TimeSchedule from '../components/TimeScheduleCart.vue';
import ItemList from '../components/ItemList.vue';

describe('TimeDisplay.vue', () => {
  it('renders a list of times when props.times is not empty', () => {
    const times = ['12:00', '13:00', '14:00'];
    const wrapper = mount(TimeSchedule, {
      props: {
        times,
      },
      global: {
        components: {
          ItemList,
        },
      },
    });

    expect(wrapper.findComponent(ItemList).exists()).toBe(true);

    expect(wrapper.findComponent(ItemList).props('items')).toEqual(times);

    expect(wrapper.text()).not.toContain('No items');
  });

  it('renders "No items" when props.times is empty', () => {
    const wrapper = mount(TimeSchedule, {
      props: {
        times: [],
      },
    });

    expect(wrapper.findComponent(ItemList).exists()).toBe(false);

    expect(wrapper.text()).toContain('No items');
  });
});
