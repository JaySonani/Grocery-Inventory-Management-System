import { expect } from "chai";
import { beforeEach } from "mocha";

import { RegularItem } from "../src/models/items/RegularItem";
import { StoreInventory } from "../src/models/StoreInventory";

import { MINIMUM_ITEM_QUALITY, NUMBER_OF_DAYS } from "../src/constants";

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

  it("should not decrement quality below 0", () => {
    while (regularItem.quality != 0) {
      regularItem.updateItemQuality();
    }
    regularItem.updateItemQuality();
    expect(regularItem.quality).to.be.equal(0);
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
