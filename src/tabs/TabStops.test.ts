import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TabStops from './TabStops.vue';
import SortableItemList from '../components/SortableItemList.vue';
import SearchIcon from '../icons/SearchIcon.vue';
import store from '../store/index';

vi.mock('../store/index', () => {
  return {
    default: {
      state: {
        busStopOrder: 'asc',
      },
      getters: {
        getBusStops: ['Stop C', 'Stop A', 'Stop B'],
      },
    },
  };
});

describe('TabStops.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders SortableItemList with filtered and sorted bus stops', () => {
    const wrapper = mount(TabStops);

    // Check if SortableItemList is rendered
    const sortableItemList = wrapper.findComponent(SortableItemList);
    expect(sortableItemList.exists()).toBe(true);

    // Check the initial sorted bus stops
    expect(sortableItemList.props('items')).toEqual(['Stop A', 'Stop B', 'Stop C']);
  });

  it('filters bus stops based on search query', async () => {
    const wrapper = mount(TabStops);

    // Simulate typing into the search input
    const input = wrapper.find('input[type="search"]');
    await input.setValue('A');

    // Get the filtered items
    const sortableItemList = wrapper.findComponent(SortableItemList);
    expect(sortableItemList.props('items')).toEqual(['Stop A']);
  });

  it('updates the list based on bus stop order state', async () => {
    // Test ascending order
    store.state.busStopOrder = 'asc';
    const wrapperAsc = mount(TabStops);
    const sortableItemListAsc = wrapperAsc.findComponent(SortableItemList);
    expect(sortableItemListAsc.props('items')).toEqual(['Stop A', 'Stop B', 'Stop C']);

    // Test descending order
    store.state.busStopOrder = 'desc';
    const wrapperDesc = mount(TabStops);
    const sortableItemListDesc = wrapperDesc.findComponent(SortableItemList);
    expect(sortableItemListDesc.props('items')).toEqual(['Stop C', 'Stop B', 'Stop A']);
  });

  it('shows SearchIcon when searchQuery is empty', () => {
    const wrapper = mount(TabStops);

    const searchIcon = wrapper.findComponent(SearchIcon);
    expect(searchIcon.exists()).toBe(true);
  });

  it('hides SearchIcon when searchQuery has value', async () => {
    const wrapper = mount(TabStops);

    const input = wrapper.find('input[type="search"]');
    await input.setValue('Text');

    const searchIcon = wrapper.findComponent(SearchIcon);
    expect(searchIcon.isVisible()).toBe(false);
  });
});
