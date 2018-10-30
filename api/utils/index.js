module.exports = {
    EXPIRE_TIME : 1000*60*60*24*2,

    checkObj: function (obj) {
        return (obj === undefined || obj === null || obj.length === 0) === false;
    }
}