import express from "express";
import cors from "cors";
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
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '../build')));

// Handle GET requests to /api route
app.post("/api/calculator", (req, res) => {
    const { dream, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    if (!dream) {
<<<<<<< HEAD
        return res.status(401).json({
=======
        return res.status(422).json({
>>>>>>> ee9e7009ff082d7838eeae75794181d56e22fd36
            status : false,
            message :'Dream is required.'
        });
    }

    if (!assets) {
<<<<<<< HEAD
        return res.status(401).json({
=======
        return res.status(422).json({
>>>>>>> ee9e7009ff082d7838eeae75794181d56e22fd36
            status : false,
            message :'Assets is required.'
        });
    }

    if (!liabilities) {
<<<<<<< HEAD
        return res.status(401).json({
=======
        return res.status(422).json({
>>>>>>> ee9e7009ff082d7838eeae75794181d56e22fd36
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