// model 
const { messages, joiners } = require("../models");

exports = module.exports = function (io) {
    io.on("connection", async (socket) => {

        socket.on('receive_user_id', async (data) => {
            await messages.findAll({ where: { receiver_id: data.receiver_id } })
                .then((data) => {
                    socket.emit("receive_message", data);
                });
        })

        socket.on("send_message", (data) => {
            messages.create(data).then(async () => {
            await messages.findAll({ where: { receiver_id: data.receiver_id } })
                .then((userMessage) => {
                    socket.broadcast.emit("receive_message", userMessage); 

                    if (userMessage.receiver_id == data.sender_id) {
                        socket.emit("receive_message", userMessage);
                    }
                })
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