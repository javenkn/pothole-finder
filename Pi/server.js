const express = require('express');
const app = express();
const wpi = require('wiring-pi');
const PORT = 3001;
const path = require('path');
const public = path.join(__dirname, 'public');
const expressWs = require('express-ws')(app);
const mercury = require('./mercury_switch');
let coordinates = [];
wpi.wiringPiSetup();

// listen for websocket connections on the root URI
app.ws('/', function(ws, req) {
  console.log('creating web socket');
  // Event Listener waiting for a message to come in over the socket connection
  ws.on('message', (coords) => {
    JSON.parse(coords);
    coordinates.push(coords);

    console.log(`received: ${coordinates}`);
    mercury(ws);
  });

  // Event Listener waiting for the connection to close
  ws.on('end', () => {
    console.log('Connection ended...');
  });

  mercury(ws);
});

app.listen(PORT, () => {
  console.log(`Now listing on Port ${PORT}`);
})
