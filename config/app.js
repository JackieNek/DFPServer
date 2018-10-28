const express = require('express');
const bodyParser = require('body-parser');
const application = express();

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());

require('./router')(application);

module.exports = application;