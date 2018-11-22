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
        if ((req.body.dataArray1 || req.body.dataArray2) && req.params.fileID) {
            if (req.body.dataArray1) {
                req.dataWho = req.body.dataArray1;
                req.dataWho.map(data => data.fileId = new ObjectID(req.params.fileID));
            };

            if (req.body.dataArray2) {
                req.dataWhat = req.body.dataArray2;
                req.dataWhat.map(data => data.fileId = new ObjectID(req.params.fileID));
            };
            next();
        } else {
            return res.status(406).json({
                err: {
                    code: 406,
                    message: 'Invalid data'
                },
                dataErr: req.body
            });
        };
    }

    function mergeData(req, res, next) {
        console.log(req.dataArray1);
        console.log(req.dataArray2);
        
        if ((req.dataArray1.length !== 0) && (req.dataArray2.length !== 0)) {
            req.data = merge(req.dataArray1, req.dataArray2);        
            next();
        } else {
            next();
        };
    }   

    function compareByTimeAndAfr(data_1, data_2) {
        const time_1 = data_1.time;
        const time_2 = data_2.time;
        const afr_1 = data_1.afr;
        const afr_2 = data_2.afr;

        if (time_1 > time_2) {
            return 1;
        } else if (time_1 < time_2) {
            return -1;
        } else {
            return afr_1.localeCompare(afr_2);
        }
    }

    function merge (arr1, arr2) {
        let count_data_1 = 0;
        let count_data_2 = 0;
        let records = [];
        let dataWhoNeedUpdate = [];
        let dataWhatNeedUpdate = [];

        arr1.sort(compareByTimeAndAfr);
        arr2.sort(compareByTimeAndAfr);
        
        do {
            switch (compareByTimeAndAfr(arr1[count_data_1], arr2[count_data_2])) {
                case 1: {
                    count_data_2++;
                    break;
                }
                case -1: {
                    count_data_1++;
                    break;
                }
                case 0: {
                    records.push(mergeRecordByData(arr1[count_data_1], arr2[count_data_2], arr1[count_data_1].fileID));
                    dataWhoNeedUpdate.push(arr1[count_data_1]);
                    dataWhatNeedUpdate.push(arr2[count_data_2]);
                    count_data_1++;
                    count_data_2++
                    break;
                }
            };
        } while(count_data_1 < arr1.length && count_data_2 < arr2.length)

        return {
            records: records,
            dataWhoNeedUpdate: dataWhoNeedUpdate,
            dataWhatNeedUpdate: dataWhatNeedUpdate
        }
    }
}