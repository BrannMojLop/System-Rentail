const passport = require('passport');
const connect = require('../config/database');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    await connect();
    User.findOne({ email: email }).then(function (user) {
        if (!user || !user.validationPassword(password)) {
            return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
        }
        return done(null, user);
    }).catch(done);
}));