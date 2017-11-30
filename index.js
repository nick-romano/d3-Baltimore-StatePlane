import _ from 'lodash';
import * as d3 from "d3";
import * as topojson from "topojson";
var mdJSON = require('./mdmhi.json')
//const simpleSlider = require('d3-simple-slider').sliderHorizontal;
require('expose-loader?d3!d3');
require('expose-loader?topojson!topojson');

//d3.sliderHorizontal = simpleSlider;

var color = d3.scaleThreshold()
  .range(["#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"])
  .domain([0, 100, 200, 300, 400, 500, 600, 1000, 20000]);

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
var topology = topojson.topology({counties: mdJSON});

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
    context.fillStyle = color((d.properties.VACANT / d.properties.TOTALPOPULATION * 1000));
    //console.log(context)
    //context.id('dd')
    context.beginPath();
    path(d);
    context.fill();      
  });

  context.beginPath();
  path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
  context.strokeStyle = '#ddd';
  context.lineWidth = 1;
  context.stroke();



function change(){

var path = d3.geoPath()
    .projection(d3.geoTransverseMercator()
      .rotate([77, -37.66666666666666])
      .fitSize([window.innerWidth, window.innerHeight - 110], land)
      );

var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    path = path.context(context)

  subset.forEach(function(d) {
    context.fillStyle = color((d.properties.VACANT / d.properties.MHI * 1000));
    //console.log(context)
    //context.id('dd')
    context.beginPath();
    path(d);
    setTimeout(function(){/**/},100)
    context.fill()
  });

  context.beginPath();
  path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
  context.strokeStyle = '#ddd';
  context.lineWidth = 1;
  context.stroke();

};

setTimeout(function(){change()}, 1000)



