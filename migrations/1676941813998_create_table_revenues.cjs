module.exports = {
    "up": "CREATE TABLE revenues (user_id INT NOT NULL, value INT NOT NULL, multiplier INT NOT NULL)",
    "down": "DROP TABLE revenues"
}