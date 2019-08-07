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
class IntEvt extends Component {
  constructor(props){
    super(props)
  }
  render() {
    const imgUri = this.props.navigation.getParam('imgUri');
    const item = this.props.navigation.getParam('item');
    return (
      <ScrollView
        style={{
          flex: 1
        }}
        >
        <Transition shared={item.eid}>
          <Image
            style={{ height: GLOBALS.extEvtHeight, width: GLOBALS.screenWidth}}
            source={{ uri: imgUri}}
            />
        </Transition>
        <Transition shared={'topbar'}>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              position: 'absolute'
            }}
            >
            <CloseButton
              onPress={() =>  this.props.navigation.goBack()}
              />
          </SafeAreaView>
        </Transition>
        <View
          style={{
            alignItems: 'center',
            padding: 20
          }}
          >
          <Text>{item.title}</Text>
          <Button
            title={'Profile'}
            onPress={() =>  this.props.navigation.push('Profile', {
              item
            })}
            >
          </Button>
        </View>
      </ScrollView>
    );
  }
}


module.exports = IntEvt;
