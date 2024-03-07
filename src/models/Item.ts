import { MAXIMUM_ITEM_QUALITY, MINIMUM_ITEM_QUALITY } from "../constants";

export class Item {
  name: string;
  sellIn: number;
  quality: number;
  qualityDecrementRate: number;
  sellInDecrementRate: number;

  constructor(
    name: string,
    sellIn: number,
    quality: number,
    qualityDecrementRate?: number,
    sellInDecrementRate?: number
  ) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.qualityDecrementRate = qualityDecrementRate ?? 1;
    this.sellInDecrementRate = sellInDecrementRate ?? 1;
  }

  updateItemQuality() {
    this.updateQuality();
    this.checkQualityRange();
  }

  private checkQualityRange() {
    if (this.quality < MINIMUM_ITEM_QUALITY) {
      this.quality = 0;
    } else if (this.quality > MAXIMUM_ITEM_QUALITY) {
      this.quality = 25;
    }
  }

  private updateQuality() {
    if (this.sellIn <= 0) {
      this.quality -= this.qualityDecrementRate;
    }
    this.quality -= this.qualityDecrementRate;
  }
}
