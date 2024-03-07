import { expect } from "chai";
import { beforeEach } from "mocha";

import { Item } from "../src/models/Item";
import { StoreInventory } from "../src/models/StoreInventory";
import {
  MAXIMUM_ITEM_QUALITY,
  MINIMUM_ITEM_QUALITY,
  MINIMUM_ITEM_SELLIN,
  NUMBER_OF_DAYS,
} from "../src/constants";

describe("Item", () => {
  let testItem: Item;
  
  let cheddarCheese: Item;
  let initialCheddarCheeseQuality: number;
  
  let instantRamen: Item;
  let initialInstantRamenQuality: number;
  let initialInstantRamenSellIn: number;

  let testInventory: StoreInventory;
  let initialQuality: number;

  beforeEach(() => {
    testItem = new Item("Apple", 10, 10);
    initialQuality = testItem.quality;

    cheddarCheese = new Item("Cheddar Cheese", 10, 16, -1);
    initialCheddarCheeseQuality = cheddarCheese.quality;

    instantRamen = new Item("Instant Ramen", 0, 5, 0, 0);
    initialInstantRamenQuality = instantRamen.quality;
    initialInstantRamenSellIn = instantRamen.sellIn;

    testInventory = new StoreInventory([testItem, cheddarCheese]);
  });

  it("should decrement quality daily", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      testItem.updateItemQuality();
      testInventory.updateSellIn();
      expect(testItem.quality).to.be.oneOf([
        initialQuality - i,
        MINIMUM_ITEM_QUALITY,
      ]);
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
      expect(testItem.quality).to.be.oneOf([
        initialQuality - i,
        MINIMUM_ITEM_QUALITY,
      ]);
    }
  });

  it("cheddar cheese: should increment quality daily ", () => {
    for (let i = 1; i <= 5; i++) {
      cheddarCheese.updateItemQuality();
      testInventory.updateSellIn();
      expect(cheddarCheese.quality).to.be.oneOf([
        initialCheddarCheeseQuality + i,
        MAXIMUM_ITEM_QUALITY,
      ]);
    }
  });

  it("instant ramen: should not update quality over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      testInventory.updateSellIn();
      expect(instantRamen.quality).to.be.equal(initialInstantRamenQuality);
    }
  });

  it("instant ramen: should not update sellIn over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      testInventory.updateSellIn();
      expect(instantRamen.sellIn).to.be.equal(initialInstantRamenSellIn);
    }
  });
});
