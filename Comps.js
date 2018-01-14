function sideBar(mdJSON, land) {
	var mountNode = document.getElementById("app");

	class Profile extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				height: 100
			};
		}

		render() {
			var { blockGroup, Population, Neighborhood, radius,pathStyle } = this.props;
			var { height } = this.state;
			return (
				<div className="box-profile">
					<h2>{blockGroup}</h2>
					<h3>Population: {Population}</h3>``
					<p>Neighborhood: {Neighborhood}</p>
					<p>Location: {this.props.location}</p>
					<div><svg><path d={radius} style={pathStyle} /></svg></div>
					<br />
					<button onClick={this.zoomPicOut.bind(this)}>-</button>
					<button onClick={this.zoomPicIn.bind(this)}>+</button>
				</div>
			);
		}
		zoomPicIn() {
			this.setState({ height: this.state.height + 20 });
		}
		zoomPicOut() {
			this.setState({ height: this.state.height - 20 });
		}
	}

	var path2 = d3.geoPath()
    .projection(d3.geoTransverseMercator()
        .rotate([77, -37.66666666666666])
        .fitSize([50, 50], mdJSON.features[2])
    );

	var radius = path2(mdJSON.features[2])

	var pathStyle = {stroke: "rgb(255, 255, 255)", fill:"rgb(255,255,255)"}



	ReactDOM.render(
		<Profile
			blockGroup={mdJSON.features[2].properties.NAME}
			Neighborhood={30}
			Population="Evanston"
			bio="I like beer"
			radius={radius}
			pathStyle={pathStyle}
		/>,	
		mountNode
	);
}

export default sideBar;
