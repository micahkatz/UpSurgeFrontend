import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { GLOBALS} from '../globals'
class IntEvt extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.item.title}
        </Text>
        <Text>
          {this.props.item.desc}
        </Text>
        <Text>
          {this.props.item.cat}
        </Text>
        <Text>
          {this.props.item.evtType}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = IntEvt;
