console.log('open: ');

const ws = new WebSocket("ws://localhost:3001/");
ws.onopen = function (event) {
  console.log('Connection is open ...');
};

ws.onerror = function (err) {
  console.log('err: ', err);
};

ws.onmessage = function (event) {
  navigator.geolocation.getCurrentPosition(showPosition);
};

function showPosition(position) {
  var coords = position.coords;
  console.log(coords.latitude);
  console.log(coords.longitude);
  ws.send(JSON.stringify({
	  lat: coords.latitude,
	  long: coords.longitude
  }));
  myMap(coords.latitude, coords.longitude);
}

function myMap(lat, long){
   var myLatLng = {lat: 21.28598544058520, lng: -157.8066086769200};
   var mapOptions = {
      center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng),
      zoom: 17,
      styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}],
      mapTypeId: google.maps.MapTypeId.HYBRID
   }
  //var map = google.maps.Map(document.getElementById("map"), mapOptions);
  //console.log(document.getElementById("map"));
  var marker = new google.maps.Marker({
	position: myLatLng,
        map: window.map,
        title: "PLEASE"
  });
}


ws.onclose = function() {
  console.log("Connection is closed ...");
};
