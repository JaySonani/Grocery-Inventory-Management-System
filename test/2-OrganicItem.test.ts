import { expect } from "chai";
import { beforeEach } from "mocha";

import { OrganicItem } from "../src/models/items/OrganicItem";
import { StoreInventory } from "../src/models/StoreInventory";

import { MINIMUM_ITEM_QUALITY, NUMBER_OF_DAYS } from "../src/constants";

describe("Organic Item", () => {
  let organicItem: OrganicItem;
  let initialQuality: number;
  let testInventory: StoreInventory;

  beforeEach(() => {
    organicItem = new OrganicItem("Organic Avocado", 5, 16);
    initialQuality = organicItem.quality;
    testInventory = new StoreInventory([organicItem]);
  });

  it("should decrement in quality 2x fast", () => {
    for (let i = 2; i <= NUMBER_OF_DAYS; i += 2) {
      organicItem.updateItemQuality();
      testInventory.updateSellIn();
      if(organicItem.sellIn > 0){
        expect(organicItem.quality).to.be.oneOf([initialQuality - i, MINIMUM_ITEM_QUALITY]);
      }
    }
  });

  it("should decrement in quality 4x fast if sellin date has passed", () => {
    while (organicItem.sellIn != 0) {
      testInventory.updateSellIn();
    }

    for (let i = 4; i <= NUMBER_OF_DAYS * 2; i += 4) {
      organicItem.updateItemQuality();
      testInventory.updateSellIn();
      expect(organicItem.quality).to.be.oneOf([initialQuality - i, MINIMUM_ITEM_QUALITY]);
    }
  });
});
