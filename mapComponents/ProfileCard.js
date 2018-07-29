import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ContainerDimensions from 'react-container-dimensions'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import svgUtils from '../svgUtils.js';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  svgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: '10px',
    paddingBottom: '10px',
    background: "rgba(179, 179, 179, 0.06)",
    borderRadius: "4px",
    marginTop: "10px"
  }
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100,
    }
  };

  render() {
    var { height } = this.state;
    var template = <Card data-scroll={this.props.Scroll} className="box-profile">
      <Typography variant="headline" component="h6" noWrap> {this.props.Neighborhood}</Typography>
      <div style={styles.svgContainer}>
      {svgUtils.prototype.createPathElement(this.props)}
      </div>
      <Typography variant="caption" gutterBottom>
      <br/>
      {this.props.blockGroup}<br/><br/>
      Population: {this.props.Population}<br/><br/>
      Median Household income: $ {this.props.MHI}<br/><br/>
      Number of Vacant Homes: {this.props.Vacants}
      </Typography>
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

export default withStyles(styles)(Profile);