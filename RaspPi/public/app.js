console.log('open: ');

const ws = new WebSocket("ws://localhost:3001/");

ws.onopen = function (event) {
  console.log('Connection is open ...');
  ws.send("Hello Server");
};

ws.onerror = function (err) {
  console.log('err: ', err);
};

ws.onmessage = function (event) { 
  navigator.geolocation.getCurrentPosition(showPosition);
};


function showPosition(position) {
  var coords = position.coords;
  console.log(ws);
  console.log(coords.latitude);
  console.log(coords.longitude);
  ws.send(JSON.stringify({
	lat: coords.latitude,
	long: coords.longitude
  }));
  myMap(coords.latitude, coords.longitude);
}

function myMap(lat, long){
   var mapOptions = {
      center: new google.maps.LatLng(lat, long),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID
   }
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

ws.onclose = function() {
  console.log("Connection is closed ...");
};
