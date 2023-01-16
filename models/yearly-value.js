import { Assets } from "./assets.js";
import { Item } from "./item.js";
import { Liabilities } from "./liabilities.js";

export class YearlyValue {
    constructor(assets = new Assets(), liabilities = new Liabilities(), monthlyRevenue = new Item(), monthlyExpense = new Item(), financiallyTowardsDream = 0) {
        this.assets = assets;
        this.liabilities = liabilities;
        this.monthlyRevenue = monthlyRevenue;
        this.monthlyExpense = monthlyExpense;

        this.monthlyNet = this.monthlyRevenue.value - this.monthlyExpense.value;
        this.annualNet = this.monthlyNet * 12;

        this.netWorth = this.assets.totalAssets + this.annualNet;

        this.financiallyTowardsDream = financiallyTowardsDream;
    }

    toFormat() {
        return {
            "assets": {
                "cash": Math.round(this.assets.cash.value),
                "home": Math.round(this.assets.home.value),
                "investments": Math.round(this.assets.investments.value),
                "businessValue": Math.round(this.assets.businessValue.value),
                "others": Math.round(this.assets.other.value),
                "totalAssets": Math.round(this.assets.totalAssets)
            },
            "liabilities": {
                "mortgage" : Math.round(this.liabilities.mortgage.value),
                "creditCard": Math.round(this.liabilities.creditCard.value),
                "studentDebt": Math.round(this.liabilities.studentDebt.value),
                "totalLiabilities": Math.round(this.liabilities.totalLiabilities)
            },
            "monthlyRevenue": Math.round(this.monthlyRevenue.value),
            "monthlyExpense": Math.round(this.monthlyExpense.value),
            "monthlyNet": Math.round(this.monthlyNet),
            "annualNet": Math.round(this.annualNet),
            "netWorth": Math.round(this.netWorth),
            "financiallyTowardsDream": (this.financiallyTowardsDream * 100).toFixed(2) + "%"
        }
    }
}