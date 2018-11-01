var LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, lib) => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        lib.user.retrieveUserById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy((username, password, done) => {
        lib.user.retrieveUser(username, password, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) return done(null, false, 10001);
            return done(null, user);
        });
    }));
};