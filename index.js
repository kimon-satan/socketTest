const express = require('express');
const http = require('http');
const WebSocket =  require('ws');
const argv = require('yargs').argv;

const app = express();

//initialize a simple http server
const server = http.createServer(app);

const PORT = argv.port || 8080;

//start our server
server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})


wss.on('connection', function connection(ws, req)
{
  console.log(`connected ${req.socket.remoteAddress}`);

  ws.send(`connection successful @${Date.now()}`);

  ws.on('message', function message(msg) {
    console.log(`Received message ${msg} from user`);
  });
});
