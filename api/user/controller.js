module.exports = lib => {
    return {
        getAllUser,
        createUser
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

    function createUser(req, res) {
        lib.user.createUser(req.body.user, (err, result) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "Unable to create user"
                })
            } else {
                let user  = result.ops[0];
                delete user.username;
                delete user.password;
                res.status(200).json(result.ops[0]);
            }
        });
    }
}