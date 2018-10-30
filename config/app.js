const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const  EXPIRE_TIME = 1000*60*60*24*2;

const application = express();

module.exports = lib => {
    application.use(bodyParser.urlencoded({extended: false}));
    application.use(bodyParser.json());
    application.use(session({secret: 'my secret',
        saveUninitialized: true,
        resave: true,
        cookie:
            {maxAge : EXPIRE_TIME}}));
    application.use(passport.initialize());
    application.use(passport.session());
    application.use(cookieParser());
    require('./router')(application, lib);
    require('./passport')(passport, lib);
    return application;
}
