import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class LocationButton extends Component {
  constructor(props) {
    super(props);

  }
  render(){
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={()=>
          this.props.moveMaptoLocation(this.props.region)}>
          <Text style={styles.p}>Oops! Hit a pothole!</Text>
        </TouchableOpacity>
        <Text style={styles.coordinates}>
          {this.props.region.latitude}
          {this.props.region.longitude}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderColor: 'black',
    margin: 10,
  },
  p: {
    color: '#fff',
    textAlign: 'center'
  },
  coordinates: {
    color: '#333'
  }
});