/*
  * a universal component that renders a linear gradient
  * from black to transparent
*/

import React from 'react';
import {
  TextInput,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GLOBALS} from 'src/globals'
import {STYLES} from 'src/styles'
function Search (props){
  return (
    <View
      style={{
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: GLOBALS.screenWidth * .9,
        backgroundColor: GLOBALS.lightGrey,
        borderRadius: 10,
        paddingLeft: 10,
        opacity: 0.8,
        height: 50,
        marginBottom: 20,
        color: GLOBALS.white
      }}
      >
      <Ionicons
        name={'ios-search'} size={25} color={GLOBALS.black}
        />
      <TextInput
        style={{
          color: GLOBALS.black,
          marginLeft: 5,
          flex: 1
        }}
        autoCorrect={false}
        placeholder={'Search'}
        returnKeyType={'search'}
        placeholderTextColor={GLOBALS.black}
        selectionColor={GLOBALS.black}
        onChangeText={(query) => props.onChangeText(query)}
        />
    </View>
  )

}

module.exports = Search;
