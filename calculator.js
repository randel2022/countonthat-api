import { Assets } from "./models/assets.js";
import { Dream } from "./models/dream.js";
import { Item } from "./models/item.js";
import { YearlyValue } from "./models/yearly-value.js";

export class Calculator {

    constructor(yearlyValue = new YearlyValue(), dream = new Dream()) {
        this.initial = yearlyValue;
        this.dream = dream;

        this.setYearOne();
    }

    setYearOne() {
        var initialAssets = this.initial.assets;
        var initialLiabilities = this.initial.liabilities;

        var assets = new Assets(
            new Item(initialAssets.cash.value, initialAssets.cash.multiplier), 
            new Item(initialAssets.home.value, initialAssets.home.multiplier), 
            new Item(initialAssets.investments.getNextValue(), initialAssets.investments.multiplier), 
            new Item(initialAssets.businessValue.getNextValue(), initialAssets.businessValue.multiplier), 
            new Item(initialAssets.other.value, initialAssets.other.multiplier)
        );

        var monthlyRevenue = new Item(
            this.initial.monthlyRevenue.getNextValue(),
            this.initial.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            this.initial.monthlyExpense.getNextValue(),
            this.initial.monthlyExpense.multiplier
        );

        var financiallyTowardsDream = assets.totalAssets / this.dream.totalDream;

        this.yearOne = new YearlyValue(assets, initialLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        this.setNextYears();
    }

    setNextYears() {
        this.yearTwo = this.getNextYear(this.yearOne);
        this.yearThree = this.getNextYear(this.yearTwo);
        this.yearFour = this.getNextYear(this.yearThree);
        this.yearFive = this.getNextYear(this.yearFour);
        this.yearSix = this.getNextYear(this.yearFive);
        this.yearSeven = this.getNextYear(this.yearSix);
        this.yearEight = this.getNextYear(this.yearSeven);
        this.yearNine = this.getNextYear(this.yearEight);
        this.yearTen = this.getNextYear(this.yearNine);
    }

    getNextYear(data) {
        var prevAssets = data.assets;
        var prevLiabilities = data.liabilities;

        var cash = new Item(
            prevAssets.cash.value + data.annualNet,
            prevAssets.cash.multiplier
        );

        var newAssets = new Assets(
            cash, 
            undefined, 
            new Item(prevAssets.investments.getNextValue(), prevAssets.investments.multiplier), 
            new Item(prevAssets.businessValue.getNextValue(), prevAssets.businessValue.multiplier), 
            undefined
        );

        var monthlyRevenue = new Item(
            data.monthlyRevenue.getNextValue(),
            data.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            data.monthlyExpense.getNextValue(),
            data.monthlyExpense.multiplier
        );

        var financiallyTowardsDream = newAssets.totalAssets / this.dream.totalDream;

        var retVal = new YearlyValue(newAssets, prevLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        return retVal;
    }

    getComputation() {
        return {
            initial: this.initial.toFormat(),
            yearOne: this.yearOne.toFormat(),
            yearTwo: this.yearTwo.toFormat(),
            yearThree: this.yearThree.toFormat(),
            yearFour: this.yearFour.toFormat(),
            yearFive: this.yearFive.toFormat(),
            yearSix: this.yearSix.toFormat(),
            yearSeven: this.yearSeven.toFormat(),
            yearEight: this.yearEight.toFormat(),
            yearNine: this.yearNine.toFormat(),
            yearTen: this.yearTen.toFormat(),
        };
    }
}