const express = require("express");
const router = express.Router();
// model 
const { messages, joiners } = require("../models");

router.post("/", (req, res) => {
    const { title, body, receiver_id, sender_id } = req.body;

    const createMessage = messages.create({
        title: title,
        body: body,
        sender_id: sender_id,
        receiver_id: receiver_id
    });

    res.json(createMessage);

})

router.get("/", async (req, res) => {
    // const {receiver_id} = req.body;
    const userMessages = await messages.findAll({
        where: { receiver_id: 1 },
        include: [{ model: joiners }]
    });

    res.json(userMessages);
})

module.exports = router;