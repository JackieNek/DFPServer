module.exports = lib => {
    const ObjectID = require('mongodb').ObjectID;

    return {
        mergeRecord,
        canRemove,
        canUpdate
    };

    function mergeRecord(req, res, next) {        
        const record = mergeRecordByData(req.body.data1, req.body.data2, req.params.fileID);
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



    function mergeRecordByData(data_1, data_2, fileID) {
        if (!data_1 || !data_2 || (data_1.time !== data_2.time)) return false;
        return {
            speaker: data_1.speaker,
            time: data_1.time,
            content: data_2.content,
            fileId: new ObjectID(fileID)
        };
    }
}