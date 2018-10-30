module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middlerware = require('./middlerware')(lib);

    router.post('/login', middlerware.validateObj, controller.login);
    // router.get("/testlogin", (req, res, next) => {
    //     if (req.isAuthenticated()) {
    //         delete user.username;
    //         delete user.password;
    //         res.status(200).json({
    //             code: 200,
    //             message: "OK",
    //             data: req.user
    //         })
    //     } else {
    //         res.status(800).json({
    //             code: 300,
    //             message: "Not access"
    //         });
    //     }
    // }, (req, res) => {});
};
