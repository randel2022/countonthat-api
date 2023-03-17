const { User } = require('../models/user');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const newUser = new User(null, email, password, firstName, lastName, null, null, null, null, null);
        newUser.findByEmail(
            (results) => {

                if (results.length != 0) {
                    return res.status(401).json({ message: 'The email address you have entered is already associated with another account.' });
                }

                newUser.create(
                    (message) => {
                        return res.status(200).json({ success: true, message: message });
                    },
                    (message) => {
                        return res.status(500).json({ message: message });
                    }
                );
            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    try {
        const { email, password } = req.body;
        const temp = new User(null, email, password, null, null, null, null, null, null, null);
        temp.findByEmail(
            (results) => {
                if (results.length == 0) {
                    return res.status(401).json({ message: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.' });
                }
                const result = results[0];
                const user = new User(
                    result.id,
                    result.email,
                    result.password,
                    result.firstName,
                    result.lastName,
                    result.age,
                    result.contact,
                    result.currency,
                    result.resetPasswordToken,
                    result.resetPasswordExpires
                );
                if (!user.comparePassword(password)) {
                    return res.status(401).json({ message: 'Invalid email or password.' });
                }

                return res.status(200).json({
                    token: user.generateJWT(),
                    user: {
                        id: result.id,
                        email: result.email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        age: result.age,
                        contact: result.contact,
                        currency: result.currency
                    }
                });

            },
            (message) => {
                return res.status(500).json({ message: message });
            }
        );

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};