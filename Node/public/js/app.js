$.getJSON( "/data/data.json" , function( result ){
  console.log(result.features);
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function gen(num, time){
  var arr = []
  for(var i = 0; i < num; i++){

    var template = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-114.08203125, 51.055207338584935]
      },
      "properties": {
      }
    };
    time += Math.round(getRandomArbitrary(12500, 50000));
    template.properties.timestamp = time;
    arr.push(template);
  }
  return arr;
}

// var insert = document.querySelector("footer");
// console.log(insert);
// var sample = gen(1010, 1451678400);
// insert.innerHTML = JSON.stringify(sample);