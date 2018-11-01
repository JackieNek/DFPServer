module.exports = lib => {
    let passport = require("passport");
    return {
        login
    };

    function login(req, res, next) {
        passport.authenticate("local", (err, user, infor) => {
            if (err) {
                next(err);
            } else if (!user) {
                res.status(401).json({
                        code: 1001,
                        message: 'Username or password wrong'
                });
            }
            req.logIn(user, err => {
                if (err) {
                    // error login
                } else {
                    delete user.username;
                    delete user.password;
                    user.id = user["_id"];
                    delete user["_id"];
                    res.status(200).json({
                        code: 200,
                        message: "OK",
                        data: user
                    });
                }
            })
        })(req, res, next);
    }
}