const express = require('express');
const app = express();
const wpi = require('wiring-pi');
const expressWs = require('express-ws')(app);
const mercury = require('./mercury_switch.js');
let coordinates = [];
const MPin = 0;
wpi.wiringPiSetup();

// static html files in public directory
app.use(express.static('./public'));

// listen for websocket connections on the root URI
app.ws('/', function(ws, req) {
  // Event Listener waiting for a message to come in over the socket connection
  ws.on('message', (coords) => {
    JSON.parse(coords);
    coordinates.push(coords);
    
    console.log(coordinates);
    console.log(`received: ${coordinates}`);
    mercury(ws);
  });

  // Event Listener waiting for the connection to close
  ws.on('end', () => {
    console.log('Connection ended...');
  });

  mercury(ws);
});

// Our server will be listening on port 3001
app.listen(3001, () => {
  console.info('Server started on port 3001');
});
