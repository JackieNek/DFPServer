module.exports = lib => {
    return {
        checkLogin: checkLogin
    };

    function checkLogin(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({
                code: 401,
                message: "Unauthorized"
            });
        }
    }
}