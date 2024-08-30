import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortableItemList from './SortableItemList.vue';

describe('SortableItemList.vue', () => {
  const items = ['Bus Stop A', 'Bus Stop B', 'Bus Stop C'];

  it('renders a list of items', () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Title', selectable: true },
    });

    const listItems = wrapper.findAll('li');
    expect(listItems.length).toBe(items.length);

    items.forEach((item, index) => {
      expect(listItems[index].text()).toBe(item);
    });
  });

  it('does not select an item if selectable is false', async () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Title', selectable: false },
    });

    const firstItem = wrapper.find('li span');

    await firstItem.trigger('click');

    expect(firstItem.classes()).not.toContain('active');
  });

  it('selects an item and emits onSelectItem event if selectable is true', async () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Title', selectable: true },
    });

    const firstItem = wrapper.find('li span');

    await firstItem.trigger('click');

    expect(firstItem.classes()).toContain('active');

    // Check that the 'onSelectItem' event is emitted with the correct payload
    expect(wrapper.emitted().onSelectItem).toBeTruthy();
    expect(wrapper.emitted().onSelectItem[0]).toEqual([items[0]]);
  });

  it('only one item should be active at a time', async () => {
    const wrapper = mount(SortableItemList, {
      props: { items, title: 'Title', selectable: true },
    });

    const listItems = wrapper.findAll('li span');

    await listItems[0].trigger('click');
    expect(listItems[0].classes()).toContain('active');
    expect(listItems[1].classes()).not.toContain('active');

    await listItems[1].trigger('click');
    expect(listItems[0].classes()).not.toContain('active');
    expect(listItems[1].classes()).toContain('active');
  });
});
