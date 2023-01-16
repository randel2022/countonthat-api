export class Item {
    constructor(value = 0, multiplier = 0) {
        this.value = value;
        this.multiplier = multiplier;
    }

    getNextValue() {
        var data = this. value * (this.multiplier / 10)
        return this.value + data
    }
}