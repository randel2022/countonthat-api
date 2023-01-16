import express from "express";
import cors from "cors";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Calculator } from "./calculator.js";
import { YearlyValue } from "./models/yearly-value.js";
import { Assets } from "./models/assets.js";
import { Liabilities } from "./models/liabilities.js";
import { Item } from "./models/item.js";
import { Dream } from "./models/dream.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express(); 
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '../build')));

// Handle GET requests to /api route
app.post("/api/calculator", (req, res) => {
    const { dream, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    if (!dream) {
        return res.status(422).json({
            status : false,
            message :'Dream is required.'
        });
    }

    if (!assets) {
        return res.status(422).json({
            status : false,
            message :'Assets is required.'
        });
    }

    if (!liabilities) {
        return res.status(422).json({
            status : false,
            message :'Liabilities is required.'
        });
    }

    if (!monthlyRevenue) {
        return res.status(422).json({
            status : false,
            message :'Monthly Revenue is required.'
        });
    }

    if (!monthlyExpense) {
        return res.status(422).json({
            status : false,
            message :'Monthly Expense is required.'
        });
    }

    var dreamModel = new Dream(dream.education, dream.savings, dream.vehicle, dream.home, dream.investments);
    
    var assetsModel = new Assets(
        new Item(assets.cash.value, assets.cash.multiplier), 
        new Item(assets.home.value, assets.home.multiplier),
        new Item(assets.investments.value, assets.investments.multiplier), 
        new Item(assets.businessValue.value, assets.businessValue.multiplier), 
        new Item(assets.other.value, assets.other.multiplier)
    );

    var liabilitiesModel = new Liabilities(
        new Item(liabilities.mortgage.value, liabilities.mortgage.multiplier), 
        new Item(liabilities.creditCard.value, liabilities.creditCard.multiplier), 
        new Item(liabilities.studentDebt.value, liabilities.studentDebt.multiplier)
    );

    var financiallyTowardsDream = assetsModel.totalAssets / dreamModel.totalDream;

    var initial = new YearlyValue(
        assetsModel, 
        liabilitiesModel, 
        new Item(monthlyRevenue.value, monthlyRevenue.multiplier), 
        new Item(monthlyExpense.value, monthlyExpense.multiplier), 
        financiallyTowardsDream
    );

    var calc = new Calculator(initial, dreamModel);

    return res.json({
        data: calc.getComputation()
    });
});

app.get("/api/hello", (req, res) => {
    return res.status(200).send("Hello World!");
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    return res.status(404).send("Page not found!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});