import { Item } from "./Item";
import { MINIMUM_ITEM_SELLIN } from "../constants";

export class StoreInventory {
  items: Array<Item>;

  constructor(items: Array<Item>) {
    this.items = items;
  }

  updateSellIn() {
    for (let i = this.items.length-1; i>=0; i--) {
      if (this.items[i].sellIn == MINIMUM_ITEM_SELLIN) {
        this.items.splice(i, 1);
      } else {
        this.items[i].sellIn -= this.items[i].sellInDecrementRate;
      }
    }
  }
}
