import { MAXIMUM_ITEM_QUALITY, MINIMUM_ITEM_QUALITY } from "../constants";

export abstract class Item {
  name: string;
  sellIn: number;
  quality: number;
  sellInDecrementRate: number;
  qualityDecrementRate: number;

  protected constructor(
    name: string,
    sellIn: number,
    quality: number,
    sellInDecrementRate?: number,
    qualityDecrementRate?: number,
  ) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.sellInDecrementRate = sellInDecrementRate ?? 1;
    this.qualityDecrementRate = qualityDecrementRate ?? 1;
  }

  updateItemQuality() {
    this.updateQuality();
    this.checkQualityRange();
  }

  private checkQualityRange() {
    if (this.quality < MINIMUM_ITEM_QUALITY) {
      this.quality = MINIMUM_ITEM_QUALITY;
    } else if (this.quality > MAXIMUM_ITEM_QUALITY) {
      this.quality = MAXIMUM_ITEM_QUALITY;
    }
  }

  private updateQuality() {
    if (this.sellIn === 0) {
      this.qualityDecrementRate *= 2;
    }
    this.quality -= this.qualityDecrementRate;
  }

}
