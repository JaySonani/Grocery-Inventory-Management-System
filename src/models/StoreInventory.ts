import { Item } from "./Item";
import { DECAY_FOR_NON_ORGANIC_ITEM, MINIMUM_ITEM_SELLIN } from "../constants";

export class StoreInventory {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      if (this.items[i].name !== "Instant Ramen") {

        // updating quality value
        if (this.items[i].name === "Cheddar Cheese") {
          this.items[i].quality += DECAY_FOR_NON_ORGANIC_ITEM;
        } else {
          if (this.items[i].sellIn <= 0) {
            this.items[i].quality -= 2 * DECAY_FOR_NON_ORGANIC_ITEM;
          } else {
            this.items[i].quality -= DECAY_FOR_NON_ORGANIC_ITEM;
          }
        }

        // updating sellIn value
        if (this.items[i].sellIn == MINIMUM_ITEM_SELLIN) {
          this.items.splice(i, 1);
        } else {
          this.items[i].sellIn -= 1;
        }
      }
    }
    // this.updateStock();
  }

  //   updateStock() {
  //     for (let i = 0; i < this.items.length; i++) {
  //       if (this.items[i].sellIn == -5) {
  //         this.items.splice(i, 1);
  //       } else {
  //         this.items[i].sellIn -= 1;
  //       }
  //     }
  //   }
}
