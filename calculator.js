import { Assets } from "./models/assets.js";
import { Dream } from "./models/dream.js";
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

        var assets = new Assets(initialAssets.cash, initialAssets.home, (initialAssets.investments * 1.1), (initialAssets.businessValue * 1.2), initialAssets.other);

        var monthlyRevenue = this.initial.monthlyRevenue * 1.2;
        var monthlyExpense = this.initial.monthlyExpense * 1.1;

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

        var cash = prevAssets.cash + data.annualNet;

        var newAssets = new Assets(cash, undefined, (prevAssets.investments * 1.1), (prevAssets.businessValue * 1.2), undefined);

        var monthlyRevenue = data.monthlyRevenue * 1.2;
        var monthlyExpense = data.monthlyExpense * 1.1;

        var financiallyTowardsDream = newAssets.totalAssets / this.dream.totalDream;


        var retVal = new YearlyValue(newAssets, prevLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        return retVal;
    }

    getComputation() {
        return {
            initial: this.initial,
            yearOne: this.yearOne,
            yearTwo: this.yearTwo,
            yearThree: this.yearThree,
            yearFour: this.yearFour,
            yearFive: this.yearFive,
            yearSix: this.yearSix,
            yearSeven: this.yearSeven,
            yearEight: this.yearEight,
            yearNine: this.yearNine,
            yearTen: this.yearTen,
        };
    }
}