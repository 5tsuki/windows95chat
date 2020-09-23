"use strict";
const express = require("express");
const path = require("path");
const http = require("http");
const socket = require('socket.io');

let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);

app.use(express.static("./public"));

let io = socket(server);

io.on('connection', socket => {
    socket.on("msg-to-server", (message) => {
      io.emit("msg-to-client", message);
    });
    socket.on("new-user", username => {
        io.emit("user-announcement", username);
    });
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});