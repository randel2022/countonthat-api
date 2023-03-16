const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models/user');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            const temp = new User(jwt_payload.id, null, null, null, null);
            temp.findById(
                (results) => {
                    if (results.length == 0) {
                        return done(null, false, {message: "User not found!"});
                    }
                    const result = results[0];
                    const { password, ...user } = result;
                    return done(null, user);
                },
                (message) => {
                    return done(err, false, { message: message });
                }
            );
        })
    );
};