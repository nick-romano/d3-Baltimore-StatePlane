import _ from 'lodash';
import * as d3 from "d3";
import * as topojson from "topojson";
import './style.css';
var React = require('react');
var ReactDOM = require('react-dom')


var mdJSON = require('./mdmhi.json')
//const simpleSlider = require('d3-simple-slider').sliderHorizontal;
require('expose-loader?d3!d3');
require('expose-loader?React!react');
require('expose-loader?ReactDOM!react-dom');
//d3.sliderHorizontal = simpleSlider;
import sideBar from './comps.js'

var color = d3.scaleThreshold()
    .range(["#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"])
    .domain([0, 1000, 5000, 10000, 20000, 30000, 50000, 80000, 200000]);

d3.select('.item-2')
    .append('div')
    .attr('id', 'contain')
    .style('padding-top', '10px')

d3.select('#contain')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '90%')
    .attr('display', 'block')
    .style('padding-top', '10px')
//.attr('left', '50%')
//.attr('position', 'relative')
//.attr('transform', "translate -50% -50%")

var chart = d3.select("svg");

//mdJSON = d3.geoProjection(function(){mdJSON,d3.geoAlbersUsa().fitSize([960, 960], d))
var topology = topojson.topology({ counties: mdJSON });

var land = topojson.feature(topology, {
    type: "GeometryCollection",
    geometries: topology.objects.counties.geometries.filter(function(d) {
        //return (d.id / 10000 | 0) % 100 !== 99;
        return true
    })
});

console.log(land)

var svgHeight = d3.select('svg').style('height').slice(0, -2) * 1;
var svgWidth = d3.select('svg').style('width').slice(0, -2) * 1;
var path = d3.geoPath()
    .projection(d3.geoTransverseMercator()
        .rotate([77, -37.66666666666666])
        .fitSize([svgWidth, svgHeight], land)
    );

var path2 = d3.geoPath()
    .projection(d3.geoTransverseMercator()
        .rotate([77, -37.66666666666666])
        .fitSize([25, 25], land)
    );


var hiddenChart = d3.select("#hiddenSVG")
    .selectAll("path")
    .data(mdJSON.features.splice(0, 1))
    .attr("d", path2)
    .style("stroke", "#fff")
    .style("stroke-width", "1")




chart.selectAll("path")
    .data(mdJSON.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .on('mouseover', function() { console.log('yo') })
    .style("fill", function(d) {

        // Get data value
        var value = d.properties.MHI;
        if (value) {
            //If value exists…
            return color(value);
        } else {
            //If value is undefined…
            return "#fffff";
        }
    });

sideBar(mdJSON, land);


export default sideBar;

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