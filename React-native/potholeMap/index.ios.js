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
        <Text style={styles.caption}>
          Map Demo!!!
        </Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 100,
  },
  caption: {
    position: 'absolute',
    alignItems: 'center',
    right: 150,
    bottom: 10
  }
});

AppRegistry.registerComponent('potholeMap', () => potholeMap);