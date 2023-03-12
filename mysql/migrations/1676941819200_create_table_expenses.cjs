module.exports = {
    "up": "CREATE TABLE expenses (user_id INT NOT NULL, value INT NOT NULL, multiplier INT NOT NULL)",
    "down": "DROP TABLE expenses"
}