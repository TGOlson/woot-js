const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Woot = require('../');

const log = (...x) => console.log(...x); // eslint-disable-line

// Server setup

server.listen(3000, () => {
  log('Server listening at port 3000');
});

app.use(express.static(__dirname + '/../'));

// Mutable server state
// Note: this assumes there is only one `wString` across all clients.
// A real application would have many rooms/documents, which would need to be name-spaced.
let currentId = 1;
let client = Woot.makeWootClientEmpty(0);

// Websockets...

io.on('connection', (socket) => {
  // Send the next id and current wString state to the new client.
  socket.emit('init', {
    clientId: currentId,
    wString: client.wString,
  });

  // Increment id
  currentId++;

  // Listen for operations sent from the client,
  // then broadcast to all other connected clients.
  socket.on('operation', operation => {
    log('Got operation:', operation);
    client = Woot.sendOperation(client, operation);

    log('New string:', Woot.showClientString(client));

    socket.broadcast.emit('operation', operation);
  });
});
