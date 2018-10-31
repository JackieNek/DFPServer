module.exports = (router, lib) => {
  const controller = require('./controller')(lib);

  router.get('/record', controller.list);

  router.post('/record', controller.create);

  router.delete('/record/:id', controller.remove);

  router.put('/record/:id', controller.update);
};
