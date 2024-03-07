import { expect } from "chai";
import { beforeEach } from "mocha";

import { RegularItem } from "../src/models/items/RegularItem";
import { StoreInventory } from "../src/models/StoreInventory";

import {
  MAXIMUM_ITEM_QUALITY,
  MINIMUM_ITEM_QUALITY,
  NUMBER_OF_DAYS,
} from "../src/constants";

describe("Regular Item", () => {
  let regularItem: RegularItem;
  let initialQuality: number;
  let storeInventory: StoreInventory;

  beforeEach(() => {
    regularItem = new RegularItem("Apple", 10, 10);
    initialQuality = regularItem.quality;

    storeInventory = new StoreInventory([regularItem]);
  });

  it("should decrement quality daily", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      regularItem.updateItemQuality();
      storeInventory.updateSellIn();
      expect(regularItem.quality).to.be.oneOf([
        initialQuality - i,
        MINIMUM_ITEM_QUALITY,
      ]);
    }
  });

  it("should have non negative quality", () => {
    expect(regularItem.quality).to.greaterThanOrEqual(-1);
  });

  it("should have quality no more than 25", () => {
    expect(regularItem.quality).to.lessThanOrEqual(MAXIMUM_ITEM_QUALITY);
  });

  it("should decrement in quality 2x fast if sellin date has passed", () => {
    while (regularItem.sellIn != 0) {
      storeInventory.updateSellIn();
    }
    const initialQuality = regularItem.quality;

    for (let i = 2; i <= NUMBER_OF_DAYS; i += 2) {
      regularItem.updateItemQuality();
      storeInventory.updateSellIn();
      expect(regularItem.quality).to.be.oneOf([
        initialQuality - i,
        MINIMUM_ITEM_QUALITY,
      ]);
    }
  });
});
