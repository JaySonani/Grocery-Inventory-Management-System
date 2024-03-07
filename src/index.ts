import { Item } from "./models/Item";
import { OrganicItem } from "./models/OrganicItem";
import { InstantRamen } from "./models/InstantRamen";
import { CheddarCheese } from "./models/CheddarCheese";
import { StoreInventory } from "./models/StoreInventory";
import { NUMBER_OF_DAYS } from "./constants";

const items = [
  new Item("Apple", 10, 10),
  new Item("Banana", 7, 9),
  new Item("Strawberry", 5, 10),
  new CheddarCheese("Cheddar Cheese", 10, 16),
  new InstantRamen("Instant Ramen", 0, 5),
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
