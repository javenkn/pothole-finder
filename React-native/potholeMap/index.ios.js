/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import MapView, { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

import Geolocation from './Geolocation.js';

export default class potholeMap extends Component {

  render() {
    return (
      <View
        style={styles.container}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 21.3069,
            longitude: -157.8583,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </MapView>
        <Text>
          Map Demo!!!
        </Text>
        <Geolocation />
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
    flex: 1
  }
});

AppRegistry.registerComponent('potholeMap', () => potholeMap);