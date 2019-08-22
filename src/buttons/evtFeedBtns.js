import React from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native'
import {GLOBALS} from 'src/globals'
import AntDesign from 'react-native-vector-icons/AntDesign'

exports.ProfileButton = (props) => {
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
          backgroundColor: GLOBALS.grey
        }}
        />
    </TouchableOpacity>
  )
}

exports.NewEvt = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        margin: 5,
        marginHorizontal: 10
      }}
      >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 /2,
          backgroundColor: GLOBALS.lightGrey,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
        <AntDesign name={'form'} size={20} color={'black'}/>
      </View>
    </TouchableOpacity>
  )
}
