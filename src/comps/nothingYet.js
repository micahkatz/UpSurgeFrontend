/*
  *  nothingYet.js - Component
  *  Component to be placed on pages whenever there's nothing to render in terms of
  *  posted data on feeds and within Events.
*/
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function NothingYet(props) {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <MaterialCommunityIcons
        name={'alert-circle-outline'} size={75} color={'#474747'} style={{
          marginTop: 50
        }}
        />
      <Text style={{
          color: '#474747',
          fontFamily: 'HelveticaNeue',
          fontSize: 20
        }}>
        {props.text}
      </Text>
    </View>
  );
}


module.exports = NothingYet;
