const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, findByEmail, findById } = require('../database/user');

class User {
    constructor(id, email, password, firstName, lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save = function (onSuccess, onFail) {

        const user = this;

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                onFail(err.message);
                return;
            };

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    onFail(err.message);
                    return;
                }

                user.password = hash;

                const data = {
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName
                };

                createUser(
                    data,
                    (result) => {
                        user.id = result.insertId;
                        onSuccess("Created user successfully.");
                    },
                    onFail
                );
            });
        });
    };

    findByEmail = function(onSuccess, onFail) {
        const user = this;

        findByEmail(
            user.email,
            onSuccess,
            onFail
        );
    };
    
    findById = function(onSuccess, onFail) {
        const user = this;

        findById(
            user.id,
            onSuccess,
            onFail
        );
    };

    comparePassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    generateJWT = function () {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        let payload = {
            id: this.id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '60m'
        });
    };
}

module.exports = {
    User
};