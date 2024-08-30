import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BusStopCart from "./BusStopsCart.vue";
import SortableItemList from "./SortableItemList.vue";
import { createStore } from "vuex";

const mockStore = createStore({});

describe("BusStopCart.vue", () => {
  it("renders SortableItemList when busStops is not empty", () => {
    const busStops = ["Stop 1", "Stop 2", "Stop 3"];
    const wrapper = mount(BusStopCart, {
      props: {
        busStops,
      },
      global: {
        plugins: [mockStore],
        components: {
          SortableItemList,
        },
      },
    });

    expect(wrapper.findComponent(SortableItemList).exists()).toBe(true);

    expect(wrapper.findComponent(SortableItemList).props("items")).toEqual(
      busStops
    );
    expect(wrapper.findComponent(SortableItemList).props("title")).toBe(
      "Bus stops"
    );
    expect(wrapper.findComponent(SortableItemList).props("selectable")).toBe(
      true
    );

    expect(wrapper.text()).not.toContain("No items");
  });

  it('renders "No items" when busStops is empty', () => {
    const wrapper = mount(BusStopCart, {
      props: {
        busStops: [],
      },
      global: {
        plugins: [mockStore],
      },
    });

    expect(wrapper.findComponent(SortableItemList).exists()).toBe(false);

    expect(wrapper.text()).toContain("No items");
  });

});
