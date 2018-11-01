module.exports = () => {
    return {
        EXPIRE_TIME : 1000*60*60*24*2,
        checkObj: checkObj,
        mergeRecord: mergeRecord
    };

    function checkObj(obj) {
        return (obj === undefined || obj === null || obj.length === 0) === false;
    }

    function mergeRecord(data_1, data_2, fileID) {
        if (data_1 || data_2 || (data_1.time !== data_2.time)) return false;
        return {
            speaker: data_1.speaker,
            time: data_1.time,
            content: data_2.content,
            fileId: fileID
        };
    }
}