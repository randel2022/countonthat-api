import express from "express";
import cors from "cors";
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Calculator } from "./calculator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3010;

const app = express(); 
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '../build')));

// Handle GET requests to /api route
app.post("/api/calculator", (req, res) => {
    const { goals, assets, liabilities, monthlyRevenue, monthlyExpense } = req.body;

    if (!goals) {
        return res.status(422).json({
            status : false,
            message :'Goals is required.'
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

    var calc = new Calculator(goals, assets, liabilities, monthlyRevenue, monthlyExpense);

    return res.status(200).json({
        status: true,
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