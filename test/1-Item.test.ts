import { expect } from "chai";
import { beforeEach } from "mocha";

import { Item } from "../src/models/Item";
import { StoreInventory } from "../src/models/StoreInventory";
import { MAXIMUM_ITEM_QUALITY, MINIMUM_ITEM_QUALITY, MINIMUM_ITEM_SELLIN, NUMBER_OF_DAYS } from "../src/constants";

describe("Item", () => {

  let testItem: Item;
  let testInventory: StoreInventory;
  let initialQuality: number;

  beforeEach(() => {
    testItem = new Item("Apple", 10, 10);
    testInventory = new StoreInventory([testItem]);
    initialQuality = testItem.quality;
  });

  it("should decrement quality daily", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      testItem.updateItemQuality();
      testInventory.updateSellIn();
      expect(testItem.quality).to.be.oneOf([initialQuality - i, MINIMUM_ITEM_QUALITY]);
    }
  });

  it("should have non negative quality", () => {
    expect(testItem.quality).to.greaterThanOrEqual(-1);
  });

  it("should have quality no more than 25", () => {
    expect(testItem.quality).to.lessThanOrEqual(MAXIMUM_ITEM_QUALITY);
  });

  it("should decrement in quality 2x fast if sellin date has passed", () => {
    while (testItem.sellIn != 0) {
      testInventory.updateSellIn();
    }
    const initialQuality = testItem.quality;

    for (let i = 2; i <= NUMBER_OF_DAYS; i += 2) {
      testItem.updateItemQuality();
      testInventory.updateSellIn();
      expect(testItem.quality).to.be.oneOf([initialQuality - i, MINIMUM_ITEM_QUALITY]);
    }
  });
});
