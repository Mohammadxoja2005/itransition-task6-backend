const express = require("express");
const router = express.Router();
// model
const { messages, joiners } = require("../models");

router.post("/", async (req, res) => {
    const { name } = req.body;

    const findedName = await joiners.findOne({ where: { name: name } });

    if (findedName == null) {
        const joinerId = await joiners.create({ name: name })
        res.json(joinerId.id)
    } else {
        res.json(findedName.id);
    }
})

router.get('/', async (req, res) => {
    const showAllNames = await joiners.findAll();

    res.json(showAllNames);
})

module.exports = router;