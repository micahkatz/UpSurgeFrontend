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
import CloseButton from '../comps/CloseButton'
import {GetIMG} from '../funcs/media'
import {
  Transition
} from 'react-navigation-fluid-transitions';
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
        <Transition shared={'topbar'}>
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
        </Transition>
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
