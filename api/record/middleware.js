module.exports = lib => {
    const utils = require('../utils');
    return {
        mergeRecord,
        canRemove,
        canUpdate
    };

    function mergeRecord(req, res, next) {
        const record = utils.mergeRecord(req.body.data1, req.body.data2, res.params.fileID);
        if (record) {
            req.record = record;
            next();
        } else {
            return res.status(406).json({
                err: {
                    code: 406,
                    message: 'Invalid data'
                }
            })
        }
    }

    function canRemove(req, res, next) {
        next();
    }

    function canUpdate(req, res, next) {
        next();
    }
}