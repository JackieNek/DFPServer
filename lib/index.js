module.exports = db => {
    const test = require('./test')(db);
    const user = require('./user')(db);
    const record = require('./record')(db);
    const file = require('./file')(db);

    return {
        test,
        user,
        record,
        file
    };
};
