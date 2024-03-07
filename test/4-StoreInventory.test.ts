import { expect } from "chai";
import { beforeEach } from "mocha";

import { Item } from "../src/models/Item";
import { OrganicItem } from "../src/models/items/OrganicItem";
import { RegularItem } from "../src/models/items/RegularItem";
import { ExceptionalItem } from "../src/models/items/ExceptionalItem";
import { StoreInventory } from "../src/models/StoreInventory";

import { NUMBER_OF_DAYS } from "../src/constants";

describe("Inventory system", () => {
  let testStoreInventory: StoreInventory;
  let testItems: Array<Item>;

  beforeEach(() => {
    testItems = [
      new RegularItem("Apple", 10, 10),
      new RegularItem("Banana", 7, 9),
      new RegularItem("Strawberry", 5, 10),

      new ExceptionalItem("Cheddar Cheese", 11, 16, 1, -1),
      new ExceptionalItem("Instant Ramen", 0, 5, 0, 0),
      
      new OrganicItem("Organic Avocado", 5, 16),
    ];
    testStoreInventory = new StoreInventory(testItems);
  });

  it("should decrement sellIn for each item", () => {
    for (let i = 0; i <= NUMBER_OF_DAYS; i++) {
      const initialItems = testStoreInventory.items.map((x) =>
        Object.assign({}, x)
      ); // making deep copy of initial values

      testStoreInventory.updateSellIn();

      testStoreInventory.items.forEach((newItem) => {
        const oldItem = initialItems.find((item) => item.name === newItem.name);
        if (newItem.name === "Instant Ramen") {
          expect(newItem.sellIn).to.be.equal(oldItem.sellIn);
        } else {
          expect(newItem.sellIn).to.be.equal(oldItem.sellIn - 1);
        }
      });
    }
  });

  it("should remove the item if 5 days passed since sellIn date", () => {
    const testItem = testItems[0];
    while (testItem.sellIn != -5) {
      testStoreInventory.updateSellIn();
    }
    testStoreInventory.updateSellIn();
    expect(testItems.find((item) => item === testItem)).to.be.undefined;
  });

});
