import React, { Component } from 'react';
import {
  Dimensions
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {GLOBALS} from '../globals'
/*
  a universal component that renders a linear gradient
  from black to transparent
*/
class Gradient extends Component {
  render() {
    if(this.props.reverse){
      return (
        <LinearGradient
          colors={['black', 'transparent']}
          locations={[0.1,1]}
          style={[this.props.style, {
            opacity: .5
          }]}
          />
      );
    } else {
      return (
        <LinearGradient
          colors={['transparent', 'black']}
          locations={[0,.9]}
          style={[this.props.style, {
            opacity: .5
          }]}
          />
      )

    }
  }
}

module.exports = Gradient;
