import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// import MapView, { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

import Geolocation from './Geolocation.js';

let {height, width} = Dimensions.get('window');

import markerData from '../dataM.json';

// var markerData = require('../../../../Node/public/data/data.json');

export default class potholeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.3069,
        longitude: -157.8583,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0952,
      },
      markers:[
        {latlng: {
          latitude: 21.2891667,
          longitude: -157.8097222
          }
        }
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

componentWillMount(){
  var pins = [];
  markerData.features.forEach((data) => {
    var lat = data.geometry.coordinates[1];
    var lng = data.geometry.coordinates[0];
    var markerObj = {
      latlng: {
        latitude: lat,
        longitude: lng
      }
    }
      pins.push(markerObj);
  })
    this.setState({
      markers: pins
    })
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={false}
          showsCompass={false}
          showsPointOfInterest={false}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((marker,i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            image={require('../assets/ph-marker-black.png')}
            title={marker.title}
            description={marker.description}
          />
        ))}
        </MapView>
        <View style={styles.container}>
          <Text>
            MAP DEMO !!!
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}

          </Text>
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    // flex: 1
    width: width,
    height: height*2/3
  }
});
