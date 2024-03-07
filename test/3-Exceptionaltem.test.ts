import { expect } from "chai";
import { beforeEach } from "mocha";

import { ExceptionalItem } from "../src/models/items/ExceptionalItem";
import { StoreInventory } from "../src/models/StoreInventory";

import { MAXIMUM_ITEM_QUALITY, NUMBER_OF_DAYS } from "../src/constants";

describe("Exceptional Item", () => {
  let cheddarCheese: ExceptionalItem;
  let initialCheddarCheeseQuality: number;

  let instantRamen: ExceptionalItem;
  let initialInstantRamenQuality: number;
  let initialInstantRamenSellIn: number;

  let storeInventory: StoreInventory;

  beforeEach(() => {
    cheddarCheese = new ExceptionalItem("Cheddar Cheese", 10, 16, 1, -1);
    initialCheddarCheeseQuality = cheddarCheese.quality;

    instantRamen = new ExceptionalItem("Instant Ramen", 0, 5, 0, 0);
    initialInstantRamenQuality = instantRamen.quality;
    initialInstantRamenSellIn = instantRamen.sellIn;

    storeInventory = new StoreInventory([instantRamen, cheddarCheese]);
  });

  it("cheddar cheese: should increment quality daily", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      cheddarCheese.updateItemQuality();
      storeInventory.updateSellIn();
      expect(cheddarCheese.quality).to.be.oneOf([
        initialCheddarCheeseQuality + i,
        MAXIMUM_ITEM_QUALITY,
      ]);
    }
  });

  it("cheddar cheese: quality should not go over 25", () => {
    while (cheddarCheese.quality != 25) {
      cheddarCheese.updateItemQuality();
    }
    cheddarCheese.updateItemQuality();
    expect(cheddarCheese.quality).to.be.equal(25);
  });

  it("instant ramen: should not update quality over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      storeInventory.updateSellIn();
      expect(instantRamen.quality).to.be.equal(initialInstantRamenQuality);
    }
  });

  it("instant ramen: should not update sellIn over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      storeInventory.updateSellIn();
      expect(instantRamen.sellIn).to.be.equal(initialInstantRamenSellIn);
    }
  });
});
