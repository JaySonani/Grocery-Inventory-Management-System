import { expect } from "chai";
import { beforeEach } from "mocha";

import { CheddarCheese } from "../src/models/CheddarCheese";
import { StoreInventory } from "../src/models/StoreInventory";
import { MAXIMUM_ITEM_QUALITY, NUMBER_OF_DAYS } from "../src/constants";

describe("Cheddar Cheese", () => {
    
    let testInventory: StoreInventory;
    let cheddarCheese: CheddarCheese;
    let initialQuality: number;

    beforeEach(()=> {
        cheddarCheese = new CheddarCheese("Cheddar Cheese", 10, 16);
        initialQuality = cheddarCheese.quality;
        testInventory = new StoreInventory([cheddarCheese]);
    })

    it("should increment quality daily ", () => {
      for(let i = 1; i <= NUMBER_OF_DAYS; i++){
          cheddarCheese.updateItemQuality();
          testInventory.updateSellIn();
          expect(cheddarCheese.quality).to.be.oneOf([initialQuality + i, MAXIMUM_ITEM_QUALITY]);
      }
    });

});