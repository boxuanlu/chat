const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const messages = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let clientCount = wss.clients.size;
  wss.clients.forEach(function each(client) {
    client.send(clientCount)
  });
  for (const message of messages) {
    ws.send(JSON.stringify(message));
  }

// this is for letting the server know if this message is come form user or system;
  ws.on('message', function incoming(data) {
    let newMessage = JSON.parse(data);
    messages.push(newMessage);
    if (newMessage.type === "user") {
      newMessage.id = uuidv4();
      wss.clients.forEach(function each(client) {
        if (client.readystate === SocketServer.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      })
    } else if (newMessage.type === "system") {
      wss.clients.forEach(function each(client) {
        if (client.readystate === SocketServer.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      })
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    let clientCount = wss.clients.size;
    wss.clients.forEach(function each(client) {
      client.send(clientCount)
    });
  });

});
