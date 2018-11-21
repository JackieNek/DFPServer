module.exports = db => {
    const test = require('./test')(db);
    const user = require('./user')(db);
    const record = require('./record')(db);
    const file = require('./file')(db);
    const who = require('./who')(db);
    const what = require('./what')(db);

    return {
        test,
        user,
        record,
        file,
        who,
        what
    };
};
