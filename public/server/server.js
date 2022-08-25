const cors = require("cors");
const { Server } = require("socket.io");
const { worker } = require("./fileReader");
const http = require("http");
const express = require("express");
const { appendFile } = require("fs");

let _close;

(function () {
  const app = express();

  const port = 5000;
  require("body-parser").urlencoded({ extended: false });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });

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

  require("events").EventEmitter.defaultMaxListeners = 0;

  const serv = server.listen(port, () => {
    console.log(`Server run: http://localhost:${port}`);
  });

  _close = () => {
    serv.close(err => {
      console.log("Http server closed.");
      process.exit(err ? 1 : 0);
    });
  };
})();

module.exports = { _close };
