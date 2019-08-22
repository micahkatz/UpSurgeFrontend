import React from 'react';
import {
  Text
} from 'react-native'
import {STYLES} from 'src/styles'

function PageTitle (props) {
  return (
    <Text
      style={STYLES.pgTitle}
      >
      {props.children}
    </Text>
  )
}

module.exports = PageTitle;
