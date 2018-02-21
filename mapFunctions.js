import * as d3 from "d3";
import * as topojson from "topojson";
import ReactResizeDetector from 'react-resize-detector';
import scaleCluster from 'd3-scale-cluster';
import legend from 'd3-svg-legend';

var svgLegend = legend;

console.log(scaleCluster)

//var mdJSON = require('./mdmhi.json')
class Map extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				height: 100,
				width: "100%",
				color: this.props.color,
    			data: this.props.mdJSON,
			};
		};

		render(e){
			var {color, width, data} = this.state;
			console.log(width);
			return (<div id="contain" width={width}>
						<svg width={width}></svg>
						<div id="legend"><Legend 
						mdJSON = {data}
						color = {color}
						/></div>
						<ReactResizeDetector handleWidth onResize={this._onResize.bind(this)}/>
					</div>
				);

			//renderMap();
		};

		componentDidMount(){
			this.renderMap(this.state.data, this.state.color);
		}

		_onResize(e){
			this.setState({width: e});
		}

		componentDidUpdate(prevProps, prevState) {
			this.renderMap(this.state.data, this.state.color);
			this.Domain(this.state.data);
		}

		renderMap(data, color) {
			//console.log('lilbitch')
			var chart = d3.select("svg");
			if(chart){
				chart.html("");
			};

		    d3.select("svg")
		        .attr('width', '100%')
		        .attr('height', '90%')
		        .attr('display', 'block')
		        .style('padding-top', '10px')

		    
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
		            //console.log(d.properties.NAME)
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

		      



		        // svg.select(".legendQuant")
		        //     .call(colorLegend);
		        };

			Domain(data){
				var dl = data.features.map(features => features.properties.MHI);
			}

	};

class Legend extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : this.props.mdJSON,
			color : this.props.color
		}
	};
	
	render(){
		var {color, data} = this.state;
		return (
			<svg></svg>
		);
		
	};

	componentDidMount(){
		this.renderLegend(this.state.data, this.state.color);
	};

	renderLegend(data, color){
		console.log('yo');
		var chart = d3.select("#legend>svg");

		chart.append("g")
		    .attr("class", "legendQuant")
		    .attr("transform", "translate(20,20)");


		var legend = svgLegend.legendColor()
    		.labelFormat(d3.format(".2f"))
    		.labels(svgLegend.legendHelpers.thresholdLabels)
    		.useClass(true)
    		.scale(color)

    	chart.select(".legendQuant")
  			.call(legend);
	}


}



export default Map;