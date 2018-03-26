import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Map from '../mapComponents.js'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class LongMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }



  render() {
    console.log("rendo")
    

    //console.log(neighborhoods)

    const listItems = this.props.Neighborhood.map((hoods,b) =>
      <MenuItem
        key = {b}
        value = {b}
        primaryText = {hoods}
      />
    )

    const ToolbarColor = {
      background: "white",
      "borderBottom": "1px solid black",
      position: "fixed",
      width: "100%",
      zIndex: 1,


    }

    return (
      <Toolbar style={ToolbarColor}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange} >
            {listItems}
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  };

  handleChange(event, index, value) {
    //this.setState({value: 3})
    console.log(event);
    this.setState({ value });
    
    var hood = event.target.innerText;
    console.log(this.props.mdJSON)
    this.props.mdJSON.features = this.props.mdJSON.features.filter(r => r.properties.Neighborhood === hood);
    
    ReactDOM.render(
      <Map
      mdJSON={this.props.mdJSON}
      Neighborhood={this.props.Neighborhood}
      color = {this.props.color}
      />, 
      document.querySelector('.content')
  );
  }
}

export default LongMenu;