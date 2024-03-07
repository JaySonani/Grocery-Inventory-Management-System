import { Item } from "./Item";

export class InstantRamen extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
    this.qualityDecrementRate = 0;
    this.sellInDecrementRate = 0;
  }
}
