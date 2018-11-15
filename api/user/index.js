module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const auth = require('../login/middlerware')(lib);
    const middleware = require('./middlerware')(lib);

    router.get('/get_all_user', auth.checkLogin, controller.getAllUser);
    router.post('/user', middleware.checkUserExist, controller.createUser);
};
