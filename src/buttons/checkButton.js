import React from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {GLOBALS} from 'src/globals'

function CheckButton (props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        padding: 5,
        paddingHorizontal: 10
      }}
      >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 /2,
          backgroundColor: GLOBALS.green,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
        <Ionicons name={'ios-checkmark'} size={35} color={'white'}
          style={{
            height: 38,
            width: 14,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          />
      </View>
    </TouchableOpacity>
  )
}

exports.CheckButton = CheckButton;
