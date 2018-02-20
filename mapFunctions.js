import * as d3 from "d3";
import * as topojson from "topojson";
import ReactResizeDetector from 'react-resize-detector';


//var mdJSON = require('./mdmhi.json')
class Map extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				height: 100,
				color: d3.scaleThreshold()
    					.range(["#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"])
    					.domain([0, 1000, 5000, 10000, 20000, 30000, 50000, 80000, 200000]),
    			data: this.props.mdJSON,
			};
		};

		render(){
			console.log('rendering...')
			var {color} = this.state;
			return (<div id="contain"><svg></svg><ReactResizeDetector handleWidth handleHeight onResize={this._onResize.bind(this)} /></div>);

			//renderMap();
		};

		componentDidMount(){
			this.renderMap(this.state.data, this.state.color);
		}

		_onResize(){
			this.render();
		}

		renderMap(data, color) {
			console.log('lilbitch')
			setTimeout(function(){
		    d3.select("svg")
		        .attr('width', '100%')
		        .attr('height', '80%')
		        .attr('display', 'block')
		        .style('padding-top', '10px')
		        .call(d3.zoom().on("zoom", function() {
		            svg.attr("transform", d3.event.transform)
		        }))

		    var chart = d3.select("svg");
		    var topology = topojson.topology({ counties: data });

		    var land = topojson.feature(topology, {
		        type: "GeometryCollection",
		        geometries: topology.objects.counties.geometries.filter(function(d) {
		            //return (d.id / 10000 | 0) % 100 !== 99;
		            return true
		        })
		    });

		    //console.log(land)

		    var svgHeight = d3.select('svg').style('height').slice(0, -2) * 1;
		    var svgWidth = d3.select('svg').style('width').slice(0, -2) * 1;
		    var path = d3.geoPath()
		        .projection(d3.geoTransverseMercator()
		            .rotate([77, -37.66666666666666])
		            .fitSize([svgWidth, svgHeight], land)
		        );

		    chart.selectAll("path")
		        .data(data.features)
		        .enter()
		        .append("path")
		        .attr("d", path)
		        .style("stroke", "#fff")
		        .style("stroke-width", "1")
		        .attr('data-Scroll', function(d, a) { return a * 357 })
		        .on('mouseover', function(d) {
		            document.getElementById("app").scrollTop = (this.getAttribute("data-Scroll") - 2);
		            console.log(d.properties.NAME)
		        })
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
		        },1000)
			};

		}



export default Map;