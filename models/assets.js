import { Item } from "./item.js";

export class Assets {
    constructor(cash = new Item(), home = new Item(), investments = new Item(), businessValue = new Item(), other = new Item()) {
        this.cash = cash;
        this.home = home;
        this.investments = investments;
        this.businessValue = businessValue;
        this.other = other;

        this.totalAssets = this.cash.value + this.home.value + this.investments.value + this.businessValue.value + this.other.value;
    }
}