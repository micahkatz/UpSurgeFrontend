import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {GLOBALS} from '../globals'
import CloseButton from '../buttons/closeButton'
import {GetIMG} from '../funcs/media'
export default class Profile extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <ScrollView
        style={{
          flex: 1
        }}
        >
        <SafeAreaView
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent'
          }}
          >
          <CloseButton
            onPress={() =>  this.props.navigation.goBack()}
            />
        </SafeAreaView>
        <SafeAreaView>
          <View
            style={{
              alignItems: 'center',
              padding: 20
            }}
            >
            <Text>{item.title}</Text>
            <Button
              title={'Profile'}
              onPress={() =>  this.props.navigation.push('Lb')}
              >
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
