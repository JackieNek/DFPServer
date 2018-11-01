module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middlerware = require('./middlerware')(lib);

    router.post('/login', controller.login);
};
