const { User } = require('../models/user');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const newUser = new User(null, email, password, firstName, lastName);
        newUser.findByEmail(
            (results) => {

                if (results.length != 0) {
                    return res.status(401).json({ message: 'The email address you have entered is already associated with another account.' });
                }

                newUser.save(
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

        const temp = new User(null, email, password, null, null);
        temp.findByEmail(
            (results) => {

                if (results.length == 0) {
                    return res.status(401).json({message: 'The email address ' + email + ' is not associated with any account. Double-check your email address and try again.'});
                }
                //validate password
                const result = results[0];
                const user = new User(result.id, result.email, result.password, result.firstName, result.lastName);
                if(!user.comparePassword(password)) {
                    return res.status(401).json({message: 'Invalid email or password.'});
                }

                return res.status(200).json({ 
                    token: user.generateJWT(),
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
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