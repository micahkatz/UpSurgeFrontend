/*
  * a universal component that renders a linear gradient
  * from black to transparent
*/

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {GLOBALS} from 'src/globals'
import {STYLES} from 'src/styles'
function Tag (props){
  return (
    <View
      key={(props.item.key) ? props.item.key : props.item}
      style={[STYLES.tagContainer, {
        backgroundColor: (props.item.pressed) ? GLOBALS.blue : GLOBALS.lightGrey,
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginVertical: 5,
        marginHorizontal: 5,
      }]}
      >
      <Text style={[STYLES.boldText, {
          color: (props.item.pressed) ? GLOBALS.white : GLOBALS.black,
          fontSize: 20
        }]}>{(props.item.title != null) ? props.item.title : props.item}</Text>
    </View>
  )

}

module.exports = Tag;
