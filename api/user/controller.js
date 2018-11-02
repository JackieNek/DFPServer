module.exports = lib => {
    return {
        getAllUser
    };

    function getAllUser(req, res) {
        lib.user.getAllUser((err, result) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Unable to get all user"
                })
            } else {
                for (let i = 0; i  < result.length; i++) {
                    delete result[i]["username"];
                    delete result[i]["password"];
                    result[i].id = result[i]["_id"];
                    delete result[i]["_id"];
                }
                res.status(200).json({
                    code: 200,
                    message: "OK",
                    data: result
                })
            }
        });
    }
}