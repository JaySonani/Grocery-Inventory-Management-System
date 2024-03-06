import { Item } from "./models/Item";
import { StoreInventory } from "./StoreInventory";

const items = [
  new Item("Apple", 10, 10),
  new Item("Banana", 7, 9),
  new Item("Strawberry", 5, 10),
  new Item("Cheddar Cheese", 10, 16),
  new Item("Instant Ramen", 0, 5),
  new Item("Organic Avocado", 5, 16),
];

const storeInventory = new StoreInventory(items);
const days = 4;

for (let i = 0; i < days; i++) {
    console.log("Day " + i + "  ---------------------------------");
    console.log("                  name      sellIn quality");
    let data = items.map(element => {
        return [element.name, element.sellIn, element.quality];

    });
    console.table(data)

    console.log();
    storeInventory.updateQuality();
}
