import { beforeEach } from "mocha";
import { StoreInventory } from "../src/StoreInventory";
import { Item } from "../src/models/Item";
import { expect } from "chai";
import { OrganicItem } from "../src/models/OrganicItem";

describe("Item", () => {
  it("should have non negative quality", () => {
    const item = new Item("Apple", 10, 10);
    expect(item.quality).to.greaterThanOrEqual(-1);
    // testItems.forEach((item) => {
    //   expect(item.quality).to.greaterThanOrEqual(0);
    // });
  });
});


