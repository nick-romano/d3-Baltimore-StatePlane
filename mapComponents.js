import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
import scaleCluster from 'd3-scale-cluster';
import legend from 'd3-svg-legend';
import svgUtils from './svgUtils.js';
import Fade from 'react-reveal/Fade';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LongMenu from './materialComponents/menu';


var svgLegend = legend;

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

	render(e) {
		var { color, width, data } = this.state;
		//console.log(width);

		return (
			<div className="content-contain" width={width}>
				<div className="item item-2">
					<svg width={width}></svg>
					<div id="legend"><Legend
						mdJSON={data}
						color={color}
					/></div>
					<ReactResizeDetector handleWidth onResize={this._onResize.bind(this)} />
				</div>
				<div className="item item-3" id="app">
					<MuiThemeProvider><LongMenu Neighborhood={this.props.Neighborhood} mdJSON={data} color={this.props.color}/></MuiThemeProvider>
					<ProfileList
						mdJSON={data}
						color={color}
					/></div>
			</div>

		);
	};

	componentDidMount() {
		this.renderMap(this.props.mdJSON, this.state.color);
	}

	_onResize(e) {
		this.setState({ width: e });
	}

	componentDidUpdate(prevProps, prevState) {
		this.renderMap(this.props.mdJSON, this.state.color);
		this.Domain(this.state.data);
	}

	renderMap(data, color) {
		var chart = d3.select("svg");
		if (chart) {
			chart.html("");
		};

		d3.select("svg")
			.attr('width', '100%')
			.attr('height', '90%')
			.attr('display', 'block')
			.style('padding-top', '10px')


		// var topology = topojson.topology({ counties: data });
		// var land = topojson.feature(topology, {
		// 	type: "GeometryCollection",
		// 	geometries: topology.objects.counties.geometries.filter(function (d) {
		// 		return (d.id / 10000 | 0) % 100 !== 99;
		// 	})
		// });

		// //console.log(land)

		var svgHeight = d3.select('svg').style('height').slice(0, -2) * 1;
		var svgWidth = d3.select('svg').style('width').slice(0, -2) * 1;
		var path = d3.geoPath()
			.projection(d3.geoMercator()
				//.rotate([77, -37.66666666666666])
				.fitSize([svgWidth, svgHeight], data)
			);

		chart.selectAll("path")
			.data(data.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("stroke", "#fff")
			.style("stroke-width", "1")
			.attr('data-Scroll', function (d, a) { return a * (232+39+58) })
			.on('mouseover', function (d) {
				document.getElementById("app").scrollTop = (this.getAttribute("data-Scroll") - 2);
				//console.log(d.properties.NAME)
			})
			.style("fill", function (d) {

				// Get data value
				var value = d.properties.mhi;
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

	Domain(data) {
		var dl = data.features.map(features => features.properties.mhi);
	}
};

class Legend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.mdJSON,
			color: this.props.color
		}
	};

	render() {
		var { color, data } = this.state;
		return (
			<svg></svg>
		);

	};

	componentDidMount() {
		this.renderLegend(this.state.data, this.state.color);
	};

	renderLegend(data, color) {
		var chart = d3.select("#legend>svg");

		chart.append("g")
			.attr("class", "legendQuant")
			.attr("transform", "translate(20,20)");


		var legend = svgLegend.legendColor()
			.labelFormat(d3.format("$"))
			.labels(svgLegend.legendHelpers.thresholdLabels)
			.useClass(true)
			.scale(color)

		chart.select(".legendQuant")
			.call(legend);

		//Hacky solution- there is probably a fix in the svg-legend code

		var rects = d3.selectAll(".legendCells>g>rect")["_groups"][0];
		for (var i = 0; i < rects.length; i++) {
			rects[i].style.fill = rects[i].classList[1];
		}

		var b = document.querySelector('#legend > svg > g > g > g:nth-child(5) > text')
		b.innerHTML = b.innerHTML.replace("or more", "")
	}
};

class ProfileList extends React.Component {
	constructor(props) {
		super(props);
	};

	

	render() {
		const pathStyle = { stroke: "black", fill: "#9C27B0" };

		const listStyles = {
			 marginTop: "70px"
		}

		const listItems = this.props.mdJSON.features.map((features, b) =>
			<Profile
				key={features.properties.geoid}
				blockGroup={features.properties.name}
				radius={svgUtils.prototype.getPath(features, features)}
				Population={features.properties.totalpopul}
				MHI={features.properties.mhi ? features.properties.mhi : "NA"}
				Neighborhood={features.properties.Neighborhood}
				Vacants={features.properties.vacant}
				Scroll={b * 357}
				Color={features.properties.mhi ? this.props.color(features.properties.mhi) : "#fffff"}
			/>
		)

		//console.log(listItems)
		return (
			<div style = {listStyles}>
				<Fade bottom>
				{listItems}
				</Fade>
			</div>
		)
	};
};

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 100,
		}
	};

	render() {
		//console.log(this.props)
		//var { blockGroup, Population, Neighborhood, radius,pathStyle } = this.props;

		var { height } = this.state;
		var template = <Card data-scroll={this.props.Scroll} className="box-profile">
			<h6>{this.props.blockGroup}</h6>
			<h6>Population: {this.props.Population}</h6>
			<h6> {this.props.Neighborhood}</h6>
			<h6>Median Household income: $ {this.props.MHI}</h6>
			<h6>Number of Vacant Homes: {this.props.Vacants}</h6>
			{svgUtils.prototype.createPathElement(this.props)}
			<br />
		</Card>
		return (
			template
		);
	};

	zoomPicIn() {
		this.setState({ height: this.state.height + 20 });
	};

	zoomPicOut() {
		this.setState({ height: this.state.height - 20 });
	};
};


export default Map;