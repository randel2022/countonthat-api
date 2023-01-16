import { Item } from "./item.js";

export class Liabilities {
    constructor(mortgage = new Item(), creditCard = new Item(), studentDebt = new Item()) {
        this.mortgage = mortgage;
        this.creditCard = creditCard;
        this.studentDebt = studentDebt;

        this.totalLiabilities = this.mortgage.value + this.creditCard.value + this.studentDebt.value;
    }
}