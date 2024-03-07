import { expect } from "chai";
import { beforeEach } from "mocha";

import { Item } from "../src/models/Item";
import { StoreInventory } from "../src/models/StoreInventory";
import { InstantRamen } from "../src/models/InstantRamen";

describe("Inventory system", () => {
  let testStoreInventory: StoreInventory;
  let testItems: Array<Item>;

  beforeEach(() => {
    testItems = [
      new Item("Apple", 10, 10),
      new Item("Banana", 7, 9),
      new Item("Strawberry", 5, 10),
      new Item("Cheddar Cheese", 10, 16),
      new Item("Instant Ramen", 0, 5),
      new Item("Organic Avocado", 5, 16),
    ];
    testStoreInventory = new StoreInventory(testItems);
  });

  it("should decrement sellIn for each item", () => {
    const intitalSellInValues = testItems.map((item) => item.sellIn);
    testStoreInventory.updateSellIn();
    const newSellInValues = testItems.map((item) => item.sellIn);

    intitalSellInValues.forEach((initialSellInValue, index) => {
      expect(newSellInValues[index]).to.be.equal(initialSellInValue - 1);
    });
    
  });

  it("should remove the item if 5 days passed since sellIn date", () => {
    const banana = testItems.find((item) => item.name === "Banana");
    while (banana.sellIn != -5) {
      testStoreInventory.updateSellIn();
    }
    testStoreInventory.updateSellIn();
    expect(testItems.find((item) => item === banana)).to.be.undefined;
  });
});
