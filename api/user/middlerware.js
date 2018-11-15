module.exports = lib => {
    let passport = require("passport");
    return {
        login,
        checkUserExist
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

    function checkUserExist(req, res, next) {
        if (!checkObj(req.body.user) || !checkObj(req.body.user.username) || !checkObj(req.body.user.name) || !checkObj(req.body.user.password)) {
            return res.status(401).json({
                code: 1002,
                message: "Invalid parameters"
            });
        }
        lib.user.retrieveUserByUsername(req.body.user.username, (err, result) => {
            if (checkObj(result)) {
                return res.status(500).json({
                    code: 999,
                    message: "Username is exist"
                });
            }
            next();
        })
    }

    function checkObj(obj) {
        return (obj === undefined || obj === null || obj.length === 0) === false;
    }
}