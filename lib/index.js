module.exports = db => {
    test = require('./test')(db);
    user = require('./user')(db);
    return {
        test,
        user
    };
}