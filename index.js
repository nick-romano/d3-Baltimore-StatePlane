import _ from 'lodash';
import * as d3 from "d3";
import * as topojson from "topojson";
var mdJSON = require('./md.json')
//const simpleSlider = require('d3-simple-slider').sliderHorizontal;
require('expose-loader?d3!d3');
require('expose-loader?topojson!topojson');

//d3.sliderHorizontal = simpleSlider;

d3.select('body')
	.append('div')
	.style('margin-top', '100px')
	.attr('id', 'contain')

d3.select('#contain')
	.append('canvas')
		.attr('width', window.innerWidth)
		.attr('height', window.innerHeight - 110)


//mdJSON = d3.geoProjection(function(){mdJSON,d3.geoAlbersUsa().fitSize([960, 960], d))
var topology = topojson.topology({counties: mdJSON});

var land = topojson.feature(topology, {
    type: "GeometryCollection",
    geometries: topology.objects.counties.geometries.filter(function(d) {
      //return (d.id / 10000 | 0) % 100 !== 99;
      return true;
    })
});

var path = d3.geoPath()
    .projection(d3.geoTransverseMercator()
      .rotate([77, -37.66666666666666])
      .fitSize([window.innerWidth, window.innerHeight - 110], land)
      );

var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    path = path.context(context)

  context.beginPath();
  path(topojson.feature(topology, topology.objects.counties));
  context.fillStyle = "#ddd";
  context.fill();

  console.log(context)

  context.beginPath();
  path(topojson.mesh(topology, topology.objects.counties, function(a, b) { return a !== b; }));
  context.strokeStyle = "#999";
  context.stroke();









