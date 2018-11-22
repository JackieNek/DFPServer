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
    });
};
