import { Item } from "./models/item.js";
import { YearlyValue } from "./models/yearly-value.js";

export class Calculator {

    constructor(goals = [], assets = [], liabilities = [], monthlyRevenue = new Item(), monthlyExpense = new Item()) {
        this.goals = goals;
        this.assets = assets;
        this.liabilities = liabilities;
        this.monthlyRevenue = monthlyRevenue;
        this.monthlyExpense = monthlyExpense;
        Object.setPrototypeOf(this.monthlyRevenue, Item.prototype);
        Object.setPrototypeOf(this.monthlyExpense, Item.prototype);
        this.parseListToItemClass(this.assets);
        this.parseListToItemClass(this.liabilities);


        var totalAssets = this.computeListTotalValue(this.assets);
        var totalLiabilities = this.computeListTotalValue(this.liabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = totalAssets / totalDream;
        var initial = new YearlyValue(
            assets, liabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream
        );

        this.initial = initial;
        this.setYearOne();
    }

    setYearOne() {
        var initialAssets = this.initial.assets;
        var initialLiabilities = this.initial.liabilities;

        var monthlyRevenue = new Item(
            undefined,
            this.initial.monthlyRevenue.getNextValue(),
            this.initial.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            undefined,
            this.initial.monthlyExpense.getNextValue(),
            this.initial.monthlyExpense.multiplier
        );

        var totalAssets = this.computeListTotalValue(initialAssets);
        var totalLiabilities = this.computeListTotalValue(initialLiabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = (totalAssets - totalLiabilities) / totalDream;

        this.yearOne = new YearlyValue(initialAssets, initialLiabilities, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

        this.setNextYears();
    }

    setNextYears() {
        // this.yearOne = this.getNextYear(this.initial);
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

        var newAssets = this.getListNextValues(prevAssets);
        this.addToCash(newAssets, data.annualNet);
        var newLiabilities = this.getListNextValues(prevLiabilities);

        var monthlyRevenue = new Item(
            undefined,
            data.monthlyRevenue.getNextValue(),
            data.monthlyRevenue.multiplier
        );

        var monthlyExpense = new Item(
            undefined,
            data.monthlyExpense.getNextValue(),
            data.monthlyExpense.multiplier
        );

        var totalAssets = this.computeListTotalValue(newAssets);
        var totalLiabilities = this.computeListTotalValue(newLiabilities);
        var totalDream = this.computeListTotalValue(this.goals);

        var financiallyTowardsDream = (totalAssets - totalLiabilities) / totalDream;

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
        }
    }

    getListNextValues(items) {
        var list = [];
        items.forEach(element => {
            list.push(
                new Item(
                    element.name,
                    element.getNextValue(),
                    element.multiplier
                )
            );
        });

        return list;
    }

    addToCash(items, annualNet) {
        items.forEach(element => {
            if (element.name == 'cash') {
                element.value = element.value + annualNet;
            }
        });
    }

    parseListToItemClass(items) {
        items.forEach(element => {
            Object.setPrototypeOf(element, Item.prototype);
        });
    }

    computeListTotalValue(items) {
        var value = 0;
        items.forEach(element => {
            value += element.value
        });

        return value;
    }
}