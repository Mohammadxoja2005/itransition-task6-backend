const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3005;
// routes 
const messages = require("./routes/messages");

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server started...")
    })
})

app.use(cors());
app.use(express.json());
// routes
app.use("/messages", messages);

app.get("/", (req, res) => {
    res.send("hello world");
})