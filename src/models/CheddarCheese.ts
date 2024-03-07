import { Item } from "./Item";

export class CheddarCheese extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
    this.qualityDecrementRate = -1;
  }
}
