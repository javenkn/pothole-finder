const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const public = path.join(__dirname, 'public');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public')); // for static image and css files

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/admin', function (req, res) {
  res.render('admin');
});

var server = app.listen(PORT, function () {
  console.log(`Now listing on Port ${PORT}`);
})