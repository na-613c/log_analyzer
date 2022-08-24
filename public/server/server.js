const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { worker } = require("./fileReader");
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

io.on("connection", socket => {
  console.log("a user connected");

  const cb = msg => {
    io.emit("new_log", msg);
  };

  setInterval(() => worker(cb), 300);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
