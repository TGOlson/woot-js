const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const Woot = require('../');

const port = 3000;

const log = (...x) => console.log(...x); // eslint-disable-line
let client = Woot.makeWootClientEmpty(0);

server.listen(port, () => {
  log('Server listening at port', port);
});

app.use(express.static(__dirname + '/../'));


io.on('connection', (socket) => {
  log('New connection');

  socket.on('operation', operation => {
    log('Got operation:', operation);
    client = Woot.sendOperation(client, operation);

    log('New string:', Woot.showClientString(client));

    socket.broadcast.emit('operation', operation);
  });
});
