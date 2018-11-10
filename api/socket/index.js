module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("click_record", (data) => {
            io.emit("click_record", data)
        });
        socket.on("un_focus_record", (data) => {
            io.emit("un_focus_record", data)
        });
    })
};
