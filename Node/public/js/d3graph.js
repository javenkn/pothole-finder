const monthArr = [];

$.getJSON( "/data/data.json" , function( result ){
  var dataArr = result.features;
  for (var i = 0; i < dataArr.length; i++) {
    var unix = dataArr[i].properties.timestamp;
    var convert = moment.unix(unix).format("MMMM");
    console.log(convert);
    monthArr.push(convert);
  }
  return monthArr;
}).then(function(arr){
  console.log('done');
});


// var monthObj = monthArr.reduce(function(prev, curr, inx, arr){
//   if (prev[curr]){
//     prev[curr]++;
//   }else{
//     prev[curr] = 1;
//   }
//   console.log(arr);
//   return prev;

// }, {});
// console.log(monthObj);

// const body = d3.select('#stats'); // inputs graph where ever you set the select function
const screenWidth = window.outerWidth;
const screenHeight = window.innerHeight;
const graphWidth = screenWidth/1.5;
const graphHeight = screenHeight/1.5;


const data = [ // fake data for Months
  {month: 'January', potHoles: 33},
  {month: 'February', potHoles: 12},
  {month: 'March', potHoles: 41},
  {month: 'April', potHoles: 16},
  {month: 'May', potHoles: 29},
  {month: 'June', potHoles: 59},
  {month: 'July', potHoles: 38},
  {month: 'August', potHoles: 21},
  {month: 'September', potHoles: 25},
  {month: 'October', potHoles: 5},
  {month: 'November', potHoles: 20},
  {month: 'December', potHoles: 13},
];

// const data = [ // fake data for Years
//   {month: 2007, potHoles: 150},
//   {month: 2008, potHoles: 200},
//   {month: 2009, potHoles: 240},
//   {month: 2010, potHoles: 250},
//   {month: 2011, potHoles: 290},
//   {month: 2012, potHoles: 270},
//   {month: 2013, potHoles: 320},
//   {month: 2014, potHoles: 350},
//   {month: 2015, potHoles: 400},
//   {month: 2016, potHoles: 330},
//   {month: 2017, potHoles: 380},
//   {month: 2018, potHoles: 450},
// ];

// const data = [ // fake data for Days of week
//   {month: 'Sunday', potHoles: 100, color: 'purple'},
//   {month: 'Monday', potHoles: 80, color: 'red'},
//   {month: 'Tuesday', potHoles: 75, color: 'blue'},
//   {month: 'Wednesday', potHoles: 150, color: 'green'},
//   {month: 'Thursday', potHoles: 200, color: 'orange'},
//   {month: 'Friday', potHoles: 270, color: 'grey'},
//   {month: 'Saturday', potHoles: 270, color: 'black'},
// ];

// const colors = [];

// // create a random colors for bars
// for(let i = 0; i < data.length; i++) {
//   let rgb = [];
//   for(let j = 0; j < 3; j++) {
//     rgb.push(Math.floor(Math.random() * 255));
//   }
//   colors.push(rgb);
// }

// margins of the graph
const margin = {left: 40, right: 20, top: 20, bottom: 40};

// width and height of graph
const width = graphWidth - margin.left - margin.right;
const height = graphHeight - margin.top - margin.bottom;

// creates x and y axis functions
const x = d3.scaleBand()
            .range([0, width])
            .padding(0.015);
const y = d3.scaleLinear()
            .range([height, 0]);

// attach the svg graph to the body of the page
// add a group element to the svg
// moves group element to the top left margin
const svg = body.append('svg')
                .attr('width', graphWidth)
                .attr('height', graphHeight)
            .append('g')
                .attr('transform',
                      'translate(' + margin.left + ',' + margin.top + ')');

// read the data
data.forEach((d) => {
  d.potHoles = +d.potHoles;
});

// Scale the range of the data in the domains
x.domain(data.map(d => d.month ));
y.domain([0, d3.max(data, (d) => {return d.potHoles; })]);

// Append rectangles to the graph
svg.selectAll('.bar')
    .data(data)
  .enter().append('rect')
    .attr('class', 'bar')
    .attr('y', d => height - 1) // starts the bars at this y coord
    .attr('height', () => 1) // starts the bars at a height of 1
    .transition()
    // add a delay of that increases by multiple of iteration
    // (i multiplied by 100) ie each bar is .1 of a second after the last
    .delay((d, i) => {
      delayBuild = 100 + (i * 100);
      return delayBuild;
    })
    .duration(1000) // overall time of the transition
    .attr('x', d => x(d.month))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.potHoles))
    .attr('height', d => height - y(d.potHoles))
    .style('fill', d => d.color);

// add the x axis
svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

// add the y axis
svg.append('g')
    .call(d3.axisLeft(y));

// add text to middle of each bar
svg.selectAll('.text')
    .data(data)
  .enter().append('text')
    .text(d => d.potHoles)
    .attr('text-anchor', 'middle')
    .attr('x', d => x(d.month) + x.bandwidth()/2)
    .attr('y', function(d) {
      return y(d.potHoles) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white");