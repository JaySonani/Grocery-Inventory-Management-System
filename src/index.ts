import { OrganicItem } from "./models/items/OrganicItem";
import { StoreInventory } from "./models/StoreInventory";
import { NUMBER_OF_DAYS } from "./constants";
import { RegularItem } from "./models/items/RegularItem";
import { ExceptionalItem } from "./models/items/ExceptionalItem";

const items = [
  new RegularItem("Apple", 10, 10),
  new RegularItem("Banana", 7, 9),
  new RegularItem("Strawberry", 5, 10),
  new ExceptionalItem("Cheddar Cheese", 10, 16, 1, -1),
  new ExceptionalItem("Instant Ramen", 0, 5, 0, 0),
  new OrganicItem("Organic Avocado", 5, 17),
];

const storeInventory = new StoreInventory(items);

const days = NUMBER_OF_DAYS;

for (let i = 0; i < days; i++) {
    console.log("Day " + i + "  ---------------------------------");
    console.log("                  name      sellIn quality");
    let data = items.map(element => {
        return [element.name, element.sellIn, element.quality];

    });
    console.table(data)

    console.log();
    items.forEach((item) => item.updateItemQuality());
    storeInventory.updateSellIn();
}
