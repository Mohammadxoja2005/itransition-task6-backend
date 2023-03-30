const { joiners } = require("../models");

exports = module.exports = function (io) {
    io.on("connection", async (socket) => {

        socket.on('register_user', async (data) => {
            const { name } = data;

            const findedName = await joiners.findOne({ where: { name: name } });

            if (findedName == null) {
                await joiners.create({ name: name })
                    .then(async (data) => {
                        socket.emit("get_user_id", { id: data.id })
                    })
            } else {
                socket.emit("get_user_id", { id: findedName.id })
            }
        })

        const allNames = await joiners.findAll();
        socket.emit("get_all_users", allNames)
        socket.broadcast.emit("get_all_users", allNames)
    })
}