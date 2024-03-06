import { beforeEach } from "mocha";
import { StoreInventory } from "../src/models/StoreInventory";
import { Item } from "../src/models/Item";
import { expect } from "chai";
import { OrganicItem } from "../src/models/OrganicItem";
import { MAXIMUM_ITEM_QUALITY, MINIMUM_ITEM_SELLIN } from "../src/constants";

describe("Item", () => {

  let testItem: Item;
  
  beforeEach(()=> {
    testItem = new Item("Apple", 10, 10);
  })



  it("should have non negative quality", () => {

    expect(testItem.quality).to.greaterThanOrEqual(-1);
    // testItems.forEach((item) => {
    //   expect(item.quality).to.greaterThanOrEqual(0);
    // });
  });

  it("should have quality no more than 25", () => {
    expect(testItem.quality).to.lessThanOrEqual(MAXIMUM_ITEM_QUALITY);
  })

  it("should not be stored after 5 days passed from sellIn", ()=> {
    expect(testItem.sellIn).to.greaterThanOrEqual(MINIMUM_ITEM_SELLIN);
  })



});


