import { Item } from "../Item";

export class RegularItem extends Item {
  constructor(
    name: string,
    sellIn: number,
    quality: number,
    sellInDecrementRate?: number,
    qualityDecrementRate?: number
  ) {
    super(name, sellIn, quality, sellInDecrementRate, qualityDecrementRate);
  }
}
