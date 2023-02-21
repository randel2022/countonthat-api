module.exports = {
    "up": "CREATE TABLE assets (user_id INT NOT NULL, name TEXT NOT NULL, value INT NOT NULL, multiplier INT NOT NULL)",
    "down": "DROP TABLE assets"
}