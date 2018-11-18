module.exports = lib => {
    const ObjectID = require('mongodb').ObjectID;

    return {
        mergeRecord,
        canRemove,
        canUpdate,
        checkData,
        mergeData
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
            fileId: new ObjectID(fileID),
            userOn: []
        };
    }

    function checkData(req, res, next) {
        if(req.body.dataArray1 && req.body.dataArray2) {
            req.dataArray1 = req.body.dataArray1;
            req.dataArray2 = req.body.dataArray2;
            next();
        } else {
            return res.status(406).json({
                err: {
                    code: 406,
                    message: 'Invalid data'
                },
                dataErr: req.body
            })
        }
    }

    function mergeData(req, res, next) {
        req.dataArray = merge(req.dataArray1, req.dataArray2, req.params.fileID);
        console.log("merge data", req.dataArray);
        next();
    }

    function compareByTime(data_1, data_2) {
        const time_1 = data_1.time;
        const time_2 = data_2.time;

        if (time_1 > time_2) {
            return 1;
        } else if (time_1 < time_2) {
            return -1;
        } else {
            return 0;
        }
    }

    function merge (arr1, arr2, fileID) {
        let count_data_1 = 0;
        let count_data_2 = 0;
        let arr = [];

        arr1.sort(compareByTime);
        arr2.sort(compareByTime);
        
        do {
            switch (compareByTime(arr1[count_data_1], arr2[count_data_2])) {
                case 1: {
                    count_data_2++;
                    break;
                }
                case -1: {
                    count_data_1++;
                    break;
                }
                case 0: {
                    arr.push(mergeRecordByData(arr1[count_data_1], arr2[count_data_2], fileID));
                    count_data_1++;
                    count_data_2++
                    break;
                }
            };
        } while(count_data_1 < arr1.length && count_data_2 < arr2.length)

        return arr
    }
}