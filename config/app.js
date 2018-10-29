const express = require('express');
const bodyParser = require('body-parser');
const application = express();

module.exports = lib => {
  application.use(bodyParser.urlencoded({ extended: false }));
  application.use(bodyParser.json());
  
  require('./router')(application, lib);
  return application;
}
