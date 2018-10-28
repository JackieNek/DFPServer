module.exports = router => {
  router.get('/test', function(req, res) {
    res.status(200).json({test: 'ok'});
  });
};
