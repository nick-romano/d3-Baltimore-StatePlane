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
			//console.log(this.props)
			//var { blockGroup, Population, Neighborhood, radius,pathStyle } = this.props;
			var { height } = this.state;
			return (
				<div className="box-profile">
					<h6>{this.props.blockGroup}</h6>
					<h3>{this.props.Population}</h3>
					<p> {this.props.Neighborhood}</p>
					<p>{this.props.location}</p>
					<div><svg height={50} width={50}><path d={this.props.radius} style={pathStyle} /></svg></div>
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

	class ProfileList extends React.Component {
		constructor(props){
			super(props);
		};

		render(){
			//console.log(this.props.mdJSON.features)
			const listItems = this.props.mdJSON.features.map((features) =>
				<Profile
					key = {features.properties.GEOID}
					blockGroup = {features.properties.NAME}
					radius= {getPath(features, features)}
				/>
			)
    		//console.log(listItems)
			return (
				<div>
					{listItems}
				</div>
			)
		}
	}

	function getPath(object, extent){


		var path2 = d3.geoPath()
     		.projection(d3.geoTransverseMercator()
        	.rotate([77, -37.66666666666666])
        	.fitSize([50, 50], extent)
    	);

     	var path = path2(object)
     	return path
	}


	var pathStyle = {stroke: "black", fill:"#9C27B0"}



	ReactDOM.render(
		<ProfileList
			mdJSON={mdJSON}
		/>,	
		mountNode
	);
}

export default sideBar;
