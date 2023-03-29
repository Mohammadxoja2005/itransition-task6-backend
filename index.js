const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 3005;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 3001
    }
});

// routes 
const messages = require("./routes/messages")(io);
const joiners = require("./routes/joiners");

app.use(cors());
app.use(express.json());
// routes
// app.use("/messages", messages);
app.use("/join", joiners);


db.sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log("server started...")
    })
})

app.get("/", (req, res) => {
    res.send("hello world");
}) 