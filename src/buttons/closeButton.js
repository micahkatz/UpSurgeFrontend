import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { VibrancyView, BlurView } from "@react-native-community/blur";

let bDiameter = 35
exports.CloseButton = (props) => {

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}>
      <BlurView blurType="dark" blurAmount={20} style={styles.vibrancy}>
        <Ionicons size={bDiameter} name={'ios-close'} color={'white'}
          style={{
            height: bDiameter
          }}
          />
      </BlurView>
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  vibrancy: {
    height: (bDiameter + 3),
    width: (bDiameter + 3),
    borderRadius: (bDiameter + 3)/2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
