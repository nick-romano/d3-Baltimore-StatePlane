import _ from 'lodash';

import './style.css';

var mdJSON = require('./mdmhi.json')
//const simpleSlider = require('d3-simple-slider').sliderHorizontal;
require('expose-loader?d3!d3');
require('expose-loader?React!react');
require('expose-loader?ReactDOM!react-dom');
//d3.sliderHorizontal = simpleSlider;
import sideBar from './comps.js'
import Map from './mapFunctions.js'

ReactDOM.render(
        <Map
        mdJSON={mdJSON}
        />, 
        document.querySelector('.item-2')
    );


function Query(url) {
    fetch('../data/baltimore/acs5', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: 'mhi'
        })
    }).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
    }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);
    });
}




sideBar(mdJSON);



// subset.forEach(function(d) {
//     context.fillStyle = color(d.properties.MHI);
//     //console.log(context)
//     //context.id('dd')
//     context.beginPath();
//     path(d);
//     context.fill();
//     context.closePath()
// });

// context.beginPath();
// path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
// context.strokeStyle = '#ddd';
// context.lineWidth = 1;
// context.stroke();
// context.closePath();


// var canvas = d3.select('canvas');

// canvas.on('mousemove', clicked);


// function clicked() {
//     var point = d3.mouse(this);
//     var node;
//     var minDistance = Infinity;
//     var start = new Date();
//     //console.log(point)
//     subset.forEach(function(d) {
//         //console.log(d)
//         var dx = d.x - point[0];
//         var dy = d.y - point[1];
//         var distance = Math.sqrt((dx * dx) + (dy * dy));
//         // if (distance < d.r) {
//         // if (distance < minDistance) {
//         if (distance < minDistance && distance < d.r + 10) {
//             // drawCircles(d);
//             minDistance = distance;
//             node = d;
//         }
//     });
//     var end = new Date();
//     //console.log('Calc Time:', end-start);
//     //drawCircles(node);
// }

// function change() {

//     var path = d3.geoPath()
//         .projection(d3.geoTransverseMercator()
//             .rotate([77, -37.66666666666666])
//             .fitSize([window.innerWidth, window.innerHeight - 110], land)
//         );

//     var canvas = d3.select("canvas").node(),
//         context = canvas.getContext("2d"),
//         path = path.context(context)

//     subset.forEach(function(d) {
//         context.fillStyle = color((d.properties.VACANT / d.properties.MHI));
//         //console.log(context)
//         //context.id('dd')
//         context.beginPath();
//         path(d);
//         context.fill()
//     });

//     context.beginPath();
//     path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
//     context.strokeStyle = '#ddd';
//     context.lineWidth = 1;
//     context.stroke();

// };