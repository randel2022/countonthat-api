import { Item } from "./item.js";
import { Calculator } from "../calculator.js";

export class YearlyValue {
    constructor(assets = [], liabilities = [], monthlyRevenue = new Item(), monthlyExpense = new Item(), financiallyTowardsDream = 0) {
        this.assets = assets;
        this.liabilities = liabilities;
        this.monthlyRevenue = monthlyRevenue;
        this.monthlyExpense = monthlyExpense;

        var totalAssets = this.computeListTotalValue(assets);

        this.monthlyNet = this.monthlyRevenue.value - this.monthlyExpense.value;
        this.annualNet = this.monthlyNet * 12;

        this.netWorth = totalAssets + this.annualNet;

        this.financiallyTowardsDream = financiallyTowardsDream;
    }

    computeListTotalValue(items) {
        var value = 0;
        items.forEach(element => {
            value += element.value
        });

        return value;
    }

    toFormat() {

        // var tempAssets = [];
        var tempAssets = {};
        var assetsTotal = 0;
        this.assets.forEach(element => {
            // tempAssets.push({
            //     [element.name] : Math.round(element.value)
            // })
            assetsTotal += element.value
            tempAssets[element.name] = Math.round(element.value)
        });
        tempAssets['totalAssets'] = Math.round(assetsTotal)


        var tempLiabilities = {};
        this.liabilities.forEach(element => {
            tempLiabilities[element.name] = Math.round(element.value)
        });

        return {
            "assets": tempAssets,
            "liabilities": tempLiabilities,
            "monthlyRevenue": Math.round(this.monthlyRevenue.value),
            "monthlyExpense": Math.round(this.monthlyExpense.value),
            "monthlyNet": Math.round(this.monthlyNet),
            "annualNet": Math.round(this.annualNet),
            "netWorth": Math.round(this.netWorth),
            "financiallyTowardsDream": (this.financiallyTowardsDream * 100).toFixed(2) + "%"
        }
    }
}