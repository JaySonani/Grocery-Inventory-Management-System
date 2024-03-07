import { expect } from "chai";
import { beforeEach } from "mocha";

import { InstantRamen } from "../src/models/InstantRamen";
import { StoreInventory } from "../src/models/StoreInventory";
import { NUMBER_OF_DAYS } from "../src/constants";

describe("Instant Ramen", () => {

  let testInventory: StoreInventory;
  let instantRamen: InstantRamen;
  let startingQuality: number;
  let startingSellIn: number;
 
  beforeEach(() => {
    instantRamen = new InstantRamen("Instant Ramen", 10, 16);
    startingQuality = instantRamen.quality;
    startingSellIn = instantRamen.sellIn;
    testInventory = new StoreInventory([instantRamen]);
  });

  it("should not update quality over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      testInventory.updateSellIn();
      expect(instantRamen.quality).to.be.equal(startingQuality);
    }
  });

  it("should not update sellIn over the days", () => {
    for (let i = 1; i <= NUMBER_OF_DAYS; i++) {
      instantRamen.updateItemQuality();
      testInventory.updateSellIn();
      expect(instantRamen.sellIn).to.be.equal(startingSellIn);
    }
  });
});
