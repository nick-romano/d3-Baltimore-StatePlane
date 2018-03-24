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
      value: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }



  render() {
    Array.prototype.contains = function (v) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };

    Array.prototype.unique = function () {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        if (!arr.includes(this[i])) {
          arr.push(this[i]);
        }
      }
      return arr;
    }
    var neighborhoods = this.props.mdJSON.features.map((features, b) =>
      features.properties.Neighborhood)

    var neighborhoods = neighborhoods.unique();

    //console.log(neighborhoods)

    const listItems = neighborhoods.map((hoods,b) =>
      <MenuItem
        key = {b}
        value = {b}
        primaryText = {hoods}
      />
    )

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {listItems}
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  };

  handleChange(event, index, value) {
    //this.setState({value: 3})
    this.setState({ value })
    console.log(event)
    var hood = event.target.innerText;
    console.log(this.props.mdJSON)
    this.props.mdJSON.features = this.props.mdJSON.features.filter(r => r.properties.Neighborhood === hood);
    
    ReactDOM.render(
      <Map
      mdJSON={this.props.mdJSON}
      color = {this.props.color}
      />, 
      document.querySelector('.content')
  );
  }
}

export default LongMenu;