import { Item } from "../Item";

export class OrganicItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
    this.qualityDecrementRate = this.qualityDecrementRate * 2;
  }
}
