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

describe("System", () => {
  let testStoreInventory: StoreInventory;
  let testItems: Item[];

  beforeEach(() => {
    testItems = [
        // name, sellIn, quality
      new Item("Apple", 10, 10),
      new OrganicItem("Banana", 7, 9),
      new Item("Strawberry", 5, 10),
      new Item("Cheddar Cheese", 10, 16),
      new Item("Instant Ramen", 0, 5),
      new Item("Organic Avocado", 5, 16),
    ];
    testStoreInventory = new StoreInventory(testItems);
  });
  it("should decrement quality daily", () => {
    const item = testItems[1];
    const previousQuality = item.quality;
    // const testInventory = new StoreInventory([item]);

    // day 1
    testStoreInventory.updateQuality();
    expect(item.quality).to.be.equal(previousQuality - 1);

    // day 2
    testStoreInventory.updateQuality();
    expect(item.quality).to.be.equal(previousQuality - 2);

    // day 3
    testStoreInventory.updateQuality();
    expect(item.quality).to.be.equal(previousQuality - 3);
  });

  it("should increment quality daily for Cheddar cheese", () => {
    const cheddarCheese = testItems[3];
    const previousQuality = cheddarCheese.quality;

    // day 1
    testStoreInventory.updateQuality();
    expect(cheddarCheese.quality).to.be.equal(previousQuality + 1);

    // day 2
    testStoreInventory.updateQuality();
    expect(cheddarCheese.quality).to.be.equal(previousQuality + 2);

    // day 3
    testStoreInventory.updateQuality();
    expect(cheddarCheese.quality).to.be.equal(previousQuality + 3);
  });

  it("should decrement quality twice fast if sellin date has passed", ()=> {
    const testItem = testItems[2];

    while(testItem.sellIn != 0){
        testStoreInventory.updateQuality();

    }

    const previousQuality = testItem.quality;

    testStoreInventory.updateQuality()
    expect(testItem.quality).to.be.equal(previousQuality - 2)

    testStoreInventory.updateQuality()
    expect(testItem.quality).to.be.equal(previousQuality - 4)

    testStoreInventory.updateQuality()
    expect(testItem.quality).to.be.equal(previousQuality - 6)


  })

  it("should remove the item if 5 days passed since sellIn date", ()=>{
    const testItem = testItems[1];

    while(testItem.sellIn != -5){
        testStoreInventory.updateQuality();
    }

    testStoreInventory.updateQuality();

    expect(testItems.find((item) => item.name === "Banana")).to.be.undefined;


  })


});
