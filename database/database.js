import * as dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql';

const dbPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

function insertGoals(connection, userId, data) {
    let sqlQuery = "INSERT INTO goals (user_id, name, value) VALUES ?"
    connection.query(
        sqlQuery,
        [data.map(item => [userId, item.name, item.value])],
        (error, results) => {
            if(error) {
                console.log('Error saving goals: ', error);
            } else {
                console.log('Goals inserted successfully.');
            }
            
        }
    );
};

function insertAssets(connection, userId, data) {
    let sqlQuery = "INSERT INTO assets (user_id, name, value, multiplier) VALUES ?"
    connection.query(
        sqlQuery,
        [data.map(item => [userId, item.name, item.value, item.multiplier])],
        (error, results) => {
            if(error) {
                console.log('Error saving assets: ', error);
            } else {
                console.log('Assets inserted successfully.');
            }
        }
    );
};

function insertLiabilities(connection, userId, data) {
    let sqlQuery = "INSERT INTO liabilities (user_id, name, value, multiplier) VALUES ?"
    connection.query(
        sqlQuery,
        [data.map(item => [userId, item.name, item.value, item.multiplier])],
        (error, results) => {
            if(error) {
                console.log('Error saving liabilities: ', error);
            } else {
                console.log('Liabilities inserted successfully.');
            }
        }
    );
};

function insertRevenues(connection, userId, data) {
    let sqlQuery = "INSERT INTO revenues SET ?"
    connection.query(
        sqlQuery,
        { user_id: userId, value: data.value, multiplier: data.multiplier },
        (error, results) => {
            if(error) {
                console.log('Error saving revenues: ', error);
            } else {
                console.log('Revenues inserted successfully.');
            }
        }
    );
};

function insertExpenses(connection, userId, data) {
    let sqlQuery = "INSERT INTO expenses SET ?"
    connection.query(
        sqlQuery,
        { user_id: userId, value: data.value, multiplier: data.multiplier },
        (error, results) => {
            if(error) {
                console.log('Error saving expenses: ', error);
            } else {
                console.log('Expenses inserted successfully.');
            }
        }
    );
};

export { dbPool, connection, insertGoals, insertAssets, insertLiabilities, insertRevenues, insertExpenses };
