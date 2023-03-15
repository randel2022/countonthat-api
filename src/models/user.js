const jwt = require('jsonwebtoken');

class User {
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    generateJWT = function() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);
    
        let payload = {
            // id: this._id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
        };
    
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
        });
    };
}

module.exports = {
    User
};