import _ from 'lodash';
import './style.css';
import jsonUtils from './jsonUtils.js';
import Map from './mapComponents.js';


console.log(jsonUtils)

require('expose-loader?d3!d3');
require('expose-loader?React!react');
require('expose-loader?ReactDOM!react-dom')


//console.log(mdJSON);

// var c =d3.scaleLinear()
//     .domain(mdJSON.features.map(features => features.properties.MHI))
//     .range(["#533A71", "#6184D8", "#50C5B7", "#9CEC5B", "#F4C002"].reverse());

// ReactDOM.render(
//         <Map
//         mdJSON= {mdJSON}
//         color = {c}
//         />, 
//         document.querySelector('.content')
// );


function Query(url) {
  fetch('http://localhost:4000/data/baltimore/ACS5_2016', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: 'mhi'
    })
  }).then(function (response) {
    // The response is a Response instance.
    // You parse the data into a useable format using `.json()`
    return response.json();
  }).then(function (data) {



    // `data` is the parsed version of the JSON returned from the above endpoint.
    console.log(data);
    var geojson = data[0].jsonb_build_object

    var c = d3.scaleQuantile()
      .domain(geojson.features.map(features => features.properties.mhi))
      .range(["#533A71", "#6184D8", "#50C5B7", "#9CEC5B", "#F4C002"].reverse());

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
    var neighborhoods = geojson.features.map((features, b) =>
      features.properties.Neighborhood)

    var neighborhoods = neighborhoods.unique();

    render(geojson, neighborhoods, c);

  });
};

const render = (geojson, neighborhoods, c) => {
  ReactDOM.render(
    <Map
      mdJSON={geojson}
      Neighborhood={neighborhoods}
      color={c}
    />,
    document.querySelector('.content')
  );
}

Query();


