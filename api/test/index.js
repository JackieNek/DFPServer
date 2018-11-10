module.exports = (router, lib, io) => {
  const controller = require('./controller')(lib, io);
  const middleware = require('./middleware')(lib);

  router.get('/test', controller.list);

  router.post('/test', middleware.validateObj ,controller.create)
};
