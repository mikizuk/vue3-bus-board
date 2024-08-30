// tests/SortableItemList.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SortableItemList from '../components/SortableItemList.vue';

vi.mock('../store/index', () => {
  return {
    default: {
      state: {
        busStopOrder: 'asc',
      },
      dispatch: vi.fn(),
    },
  };
});

describe('SortableItemList.vue', () => {
  const items = ['Bus Stop A', 'Bus Stop B', 'Bus Stop C'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title with the correct bus stop order', () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Bus Stops', selectable: true },
    });

    const title = wrapper.find('h4');
    expect(title.text()).toContain('Bus Stops (asc)');
  });

  it('renders the ItemList component with the correct props', () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Bus Stops', selectable: true },
    });

    const itemList = wrapper.findComponent({ name: 'ItemList' });

    expect(itemList.exists()).toBe(true);
    expect(itemList.props('items')).toEqual(items);
    expect(itemList.props('selectable')).toBe(true);
  });

  it('emits "onSelectItem" when an item is selected in ItemList', async () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Bus Stops', selectable: true },
    });

    const itemList = wrapper.findComponent({ name: 'ItemList' });

    await itemList.vm.$emit('onSelectItem', items[0]);

    expect(wrapper.emitted().onSelectItem).toBeTruthy();
    expect(wrapper.emitted().onSelectItem[0]).toEqual([items[0]]);
  });
});
