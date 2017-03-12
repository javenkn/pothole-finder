const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const public = path.join(__dirname, 'public');
const expressWs = require('express-ws')(app);
let coordinates = [];

//console.log(coords);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); // for static image and css files

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.get('/datum', function(req, res) {
  const data = fs.readFileSync('public/data/data.json');
  res.json(data);
});

app.post('/datum', function(req, res) {

});

// listen for websocket connections on the root URI
app.ws('/', function(ws, req) {
  // Event Listener waiting for a message to come in over the socket connection
  ws.on('message', (coords) => {
    JSON.parse(coords);
    coordinates.push(coords);

    console.log(`received: ${coordinates}`);
    //mercury(ws);
  });

  // Event Listener waiting for the connection to close
  ws.on('end', () => {
    console.log('Connection ended...');
  });

  //mercury(ws);
});

app.listen(PORT, () => {
  console.log(`Now listing on Port ${PORT}`);
})
