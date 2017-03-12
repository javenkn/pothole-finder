import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, AppState } from 'react-native';

// import MapView, { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

import Geolocation from './Geolocation.js';
import LocationButton from './LocationButton.js';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

let {height, width} = Dimensions.get('window');

export default class potholeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.3069,
        longitude: -157.8583,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers:[
        {latlng: {latitude: 21.3069, longitude: -157.8583},
          title: "first marker" , description: "FIRST"},
        {latlng: {latitude: 21.3169, longitude: -157.8683},
          title: "Saxophone Club" , description: "A music pub for saxophone lover"},
        {latlng: {latitude: 21.3269, longitude: -157.8483},
          title: "Coco Depertment Store" , description: "Fashion Department Store"},
      ]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidUpdate() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      const seconds = 5;
      let date = new Date(Date.now() + (seconds * 1000));
      console.log(`date ${date} and ${seconds}`);

      PushNotification.localNotificationSchedule({
        message: "WARNING! There is a pothole in 100ft.",
        date,
      });
    }
  }

  moveMaptoLocation(newPotHole) {
    newPotHole.latitude = newPotHole.latitude+0.002;
    newPotHole.longitude = newPotHole.longitude+0.002;
    let newMarker = {
      latlng: {latitude: newPotHole.latitude, longitude: newPotHole.longitude},
      title: "Oops",
      description: "Hit a new pothole",
    };
    this.state.markers.push(newMarker);
    let pushedMarker = this.state.markers;
    this.setState(pushedMarker);
  }



  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={false}
          showsPointOfInterest={false}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((marker,i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
        </MapView>
        <View style={styles.container}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}
          </Text>
          <LocationButton
            moveMaptoLocation={this.moveMaptoLocation}
            region={this.state.region}
            markers={this.state.markers}/>
          <PushController></PushController>
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
