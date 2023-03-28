const express = require("express");
const router = express.Router();
// model 
const { messages, joiners } = require("../models");

exports = module.exports = function (io) {
    io.on("connection", async (socket) => {

        const userMessages = await messages.findAll();

        socket.emit("receive_message", userMessages);

        socket.on("send_message", (data) => {
            messages.create(data).then(async () => { 

                const userMessages = await messages.findAll();

                socket.broadcast.emit("receive_message", userMessages);
                socket.emit("receive_message", userMessages);
            });

        })
    })
}

// router.post("/", async (req, res) => {
//     const { title, body, receiver_id, sender_id } = req.body;

//     const createMessage = messages.create({
//         title: title,
//         body: body,
//         sender_id: sender_id,
//         receiver_id: receiver_id
//     });
//     res.json(createMessage);
// })

// router.get("/:receiver_id", async (req, res) => {
//     const { receiver_id } = req.params;

//     const userMessages = await messages.findAll({
//         where: { receiver_id: receiver_id },
//         include: [{ model: joiners }]
//     });

//     res.json(userMessages);
// })

// module.exports = router;