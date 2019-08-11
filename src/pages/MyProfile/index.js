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
import {GLOBALS} from 'src/globals'
import CloseButton from 'src/comps/CloseButton'
import {GetIMG} from 'src/funcs/media'
import {
  Transition
} from 'react-navigation-fluid-transitions';
import TopBar from 'src/comps/TopBar'

export default class MyProfile extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1
        }}
        >
        <TopBar
          left={'CLOSE'}
          leftPress={this.props.navigation.pop}
          />
        <SafeAreaView>
          <View
            style={{
              alignItems: 'center',
              padding: 20
            }}
            >
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
