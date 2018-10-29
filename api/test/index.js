module.exports = (router, lib) => {
  const controller = require('./controller')(lib);
  const middleware = require('./middleware')(lib);

  router.get('/test', controller.list);

  router.post('/test', middleware.validateObj ,controller.create)
};
