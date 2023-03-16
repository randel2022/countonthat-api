module.exports = {
    "up": "CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL)",
    "down": "DROP TABLE users"
}