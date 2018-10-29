module.exports = lib => {
  return {
    validateObj: validateObj
  };

  function validateObj(req, res, next) {
    next();
  }

}