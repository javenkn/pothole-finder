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
          <Text>Oops! Hit a pothole!</Text>
        </TouchableOpacity>
        <Text>
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
    backgroundColor: 'lightgray',
    borderColor: 'black',
    margin: 10
  }
});