module.exports = (io, lib) => {
    io.on("connection", (socket) => {
        socket.on("click_record", (data) => {            
            lib.record.addUserOn(data, (err, docs) => {
                io.emit("click_record", data);
            });
        });
        socket.on("un_focus_record", (data) => {
            lib.record.removeUserOn(data, (err, docs) => {
                io.emit("un_focus_record", data);
            });
        });
        socket.on("create_data_file_who", (data) => {
            lib.who.list({fileId: data.fileId}, data => {
                io.emit("create_data_file_who", data)
            });
        });
        socket.on("create_data_file_what", (data) => {
            lib.what.list({fileId: data.fileId}, data => {
                io.emit("create_data_file_what", data)
            });
        });
    });
};
