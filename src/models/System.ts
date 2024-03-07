import { Item } from "./Item";
import { RegularItem } from "./items/RegularItem";
import { OrganicItem } from "./items/OrganicItem";
import { ExceptionalItem } from "./items/ExceptionalItem";
import { StoreInventory } from "./StoreInventory";

import { NUMBER_OF_DAYS } from "../constants";

export class System {
  items: Array<Item>;
  storeInventory: StoreInventory;

  constructor() {
    this.items = [
      new RegularItem("Apple", 10, 10),
      new RegularItem("Banana", 7, 9),
      new RegularItem("Strawberry", 5, 10),

      new ExceptionalItem("Cheddar Cheese", 10, 16, 1, -1),
      new ExceptionalItem("Instant Ramen", 0, 5, 0, 0),

      new OrganicItem("Organic Avocado", 5, 17),
    ];

    this.storeInventory = new StoreInventory(this.items);
  }

  updateInventory() {
    for (let i = 0; i < NUMBER_OF_DAYS; i++) {
      console.log("Day " + i + "  ---------------------------------");
      console.log("                  name      sellIn quality");

      let data = this.items.map((element: Item) => [
        element.name,
        element.sellIn,
        element.quality,
      ]);

      console.table(data);
      console.log();

      this.items.forEach((item) => item.updateItemQuality());
      this.storeInventory.updateSellIn();
    }
  }
}
