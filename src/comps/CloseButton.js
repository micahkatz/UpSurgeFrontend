import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { VibrancyView } from "@react-native-community/blur";
class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.container}>
        <VibrancyView blurType="light" style={styles.vibrancy}>
          <AntDesign size={30} name={'closecircle'}/>
        </VibrancyView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15
  },
  vibrancy: {
    height: 30,
    width: 30,
    borderRadius: 15
  }
});

module.exports = CloseButton;
