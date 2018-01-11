import _ from 'lodash';
import * as d3 from "d3";
import * as topojson from "topojson";
var React = require('react');

var mdJSON = require('./mdmhi.json')
//const simpleSlider = require('d3-simple-slider').sliderHorizontal;
require('expose-loader?d3!d3');
require('expose-loader?topojson!topojson');
require('expose-loader?React!react')
//d3.sliderHorizontal = simpleSlider;
console.log(mdJSON)


var color = d3.scaleThreshold()
    .range(["#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"])
    .domain([0, 1000, 5000, 10000, 20000, 30000, 50000, 80000, 200000]);

d3.select('body')
    .append('div')
    .style('margin-top', '100px')
    .attr('id', 'contain')

d3.select('#contain')
    .append('canvas')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight - 110)

var chart = d3.select("canvas")

//mdJSON = d3.geoProjection(function(){mdJSON,d3.geoAlbersUsa().fitSize([960, 960], d))
var topology = topojson.topology({ counties: mdJSON });

var land = topojson.feature(topology, {
    type: "GeometryCollection",
    geometries: topology.objects.counties.geometries.filter(function(d) {
        //return (d.id / 10000 | 0) % 100 !== 99;
        return true
    })
});


var path = d3.geoPath()
    .projection(d3.geoTransverseMercator()
        .rotate([77, -37.66666666666666])
        .fitSize([window.innerWidth, window.innerHeight - 110], land)
    );

var subset = topojson.feature(topology, topology.objects.counties)
    .features.filter(function(d) {
        return d;
    });


var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    path = path.context(context)

subset.forEach(function(d) {
    context.fillStyle = color(d.properties.MHI);
    //console.log(context)
    //context.id('dd')
    context.beginPath();
    path(d);
    context.fill();
    context.closePath()
});

context.beginPath();
path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
context.strokeStyle = '#ddd';
context.lineWidth = 1;
context.stroke();
context.closePath();


var canvas = d3.select('canvas');

canvas.on('mousemove', clicked);


function clicked() {
    var point = d3.mouse(this);
    var node;
    var minDistance = Infinity;
    var start = new Date();
    //console.log(point)
    subset.forEach(function(d) {
        //console.log(d)
        var dx = d.x - point[0];
        var dy = d.y - point[1];
        var distance = Math.sqrt((dx * dx) + (dy * dy));
        // if (distance < d.r) {
        // if (distance < minDistance) {
        if (distance < minDistance && distance < d.r + 10) {
            // drawCircles(d);
            minDistance = distance;
            node = d;
        }
    });
    var end = new Date();
    //console.log('Calc Time:', end-start);
    //drawCircles(node);
}

function change() {

    var path = d3.geoPath()
        .projection(d3.geoTransverseMercator()
            .rotate([77, -37.66666666666666])
            .fitSize([window.innerWidth, window.innerHeight - 110], land)
        );

    var canvas = d3.select("canvas").node(),
        context = canvas.getContext("2d"),
        path = path.context(context)

    subset.forEach(function(d) {
        context.fillStyle = color((d.properties.VACANT / d.properties.MHI));
        //console.log(context)
        //context.id('dd')
        context.beginPath();
        path(d);
        context.fill()
    });

    context.beginPath();
    path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;
    context.stroke();

};