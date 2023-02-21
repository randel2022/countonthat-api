module.exports = {
    "up": "CREATE TABLE goals (user_id INT NOT NULL, name TEXT NOT NULL, value INT NOT NULL)",
    "down": "DROP TABLE goals"
}