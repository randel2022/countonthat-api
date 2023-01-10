import express from "express";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Calculator } from "./calculator.js";
import { YearlyValue } from "./models/yearly-value.js";
import { Assets } from "./models/assets.js";
import { Liabilities } from "./models/liabilities.js";
import { Dream } from "./models/dream.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '../build')));

// Handle GET requests to /api route
app.post("/api/calculator", (req, res) => {
    const { dream, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    if (!dream) {
        res.status(401).json({
            status : false,
            message :'Dream is required.'
        });
    }

    if (!assets) {
        res.status(401).json({
            status : false,
            message :'Assets is required.'
        });
    }

    if (!liabilities) {
        res.status(401).json({
            status : false,
            message :'Liabilities is required.'
        });
    }

    var dreamModel = new Dream(dream.education, dream.savings, dream.vehicle, dream.home, dream.investments);
    var assetsModel = new Assets(assets.cash, assets.home, assets.investments, assets.businessValue, assets.other);
    var liabilitiesModel = new Liabilities(liabilities.mortgage, liabilities.credit, liabilities.studentDebt);

    var financiallyTowardsDream = assetsModel.totalAssets / dreamModel.totalDream;

    var initial = new YearlyValue(assetsModel, liabilitiesModel, monthlyRevenue, monthlyExpense, financiallyTowardsDream);

    var calc = new Calculator(initial, dreamModel);

    res.json({
        data: calc.getComputation()
    });
});

app.get("/api/hello", (req, res) => {
    res.status(200).send("Hello World!");
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.status(404).send("Page not found!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});