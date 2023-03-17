const { request } = require("express");
const express = require("express");
const { WebSocketServer } = require("ws");
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`Example app listening on port 8000`);
});

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", (ws, request) => {
  wss.clients.forEach((client) => {
    client.send(`new user. current user count : ${wss.clients.size}`);
  });

  // console.log(`new user : ${request.socket.remoteAddress}`);
  console.log(wss.clients.size);

  ws.on("close", () => {
    wss.clients.forEach((client) => {
      client.send(`leave chat room. current user cnt : ${wss.clients.size}`);
    });
  });

  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      client.send(data.toString());
    });
  });
});
