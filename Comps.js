import * as d3 from "d3";
import scaleCluster from 'd3-scale-cluster';

function sideBar(mdJSON) {
	var mountNode = document.getElementById("app");

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
			return (
				<div className="box-profile" data-scroll={this.props.Scroll}>
					<h6>{this.props.blockGroup}</h6>
					<h6>Population: {this.props.Population}</h6>
					<p> {this.props.Neighborhood}</p>
					<h6>Median Household income: ${this.props.MHI}</h6>
					<h6>Number of Vacant Homes: {this.props.Vacants}</h6>
					<div><svg height={50} width={50}><path d={this.props.radius} fill={this.props.Color} /></svg></div>
					<br />
					<button onClick={this.zoomPicOut.bind(this)}>-</button>
					<button onClick={this.zoomPicIn.bind(this)}>+</button>
				</div>
			);
		};

		zoomPicIn() {
			this.setState({ height: this.state.height + 20 });
		};

		zoomPicOut() {
			this.setState({ height: this.state.height - 20 });
		};
	}

	class ProfileList extends React.Component {
		constructor(props) {
		        super(props);

		};

		render(){
			//console.log(this.props.mdJSON.features)
			const color = d3.scaleLinear()
    						.domain(this.props.mdJSON.features.map(features => features.properties.MHI))
    						.range(["#533A71", "#6184D8", "#50C5B7", "#9CEC5B", "#F4C002"]);

    		const pathStyle = {stroke: "black", fill:"#9C27B0"};

			const listItems = this.props.mdJSON.features.map((features, b) =>
				<Profile
					key = {features.properties.GEOID}
					blockGroup = {features.properties.NAME}
					radius= {this.getPath(features, features)}
					Population = {features.properties.TOTALPOPULATION}
					MHI = {features.properties.MHI}
					Vacants = {features.properties.VACANT}
					Scroll = {b * 357}
					Color = {features.properties.MHI ? color(features.properties.MHI):"#fffff"}
				/>
			)
    		//console.log(listItems)
			return (
				<div>
					{listItems}
				</div>
			)
		}

		getPath(object, extent){
			var path2 = d3.geoPath()
     			.projection(d3.geoTransverseMercator()
        		.rotate([77, -37.66666666666666])
        		.fitSize([50, 50], extent));

     		var path = path2(object)
     		return path
		};
	};


	ReactDOM.render(
		<ProfileList
			mdJSON={mdJSON}
		/>,	
		mountNode
	);
}

export default sideBar;
