/*
  *  TopBar.js - Component
  *  The component for the top bar of the app within which there's an interchangable
  *  set of options for what can be used as this top bar, including but not limited to
  *  what's shown on the feed, within Submissions, within Events, and a few other
  *  variations.
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ActionSheetIOS,
  TouchableWithoutFeedback
} from 'react-native';
import {GLOBALS} from '../globals'
import {STYLES} from '../styles'
import {FadeIn, FadeOut} from '../animations'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CloseButton from './CloseButton'
var iconColor = GLOBALS.grey
import {
  Transition
} from 'react-navigation-fluid-transitions';

class TopBar extends Component {
  constructor(props){
    super(props)
    iconColor = this.getIconColor(props.iconColor)
    this.state = {
      decompressedImg: false
    }
  }
  getIconColor(color) {
    if(color){
      return color
    } else {
      return GLOBALS.textColor
    }
  }
  handlePress(side){
    if(side == 'LEFT'){
      this.props.leftPress()
    } else {
      this.props.rightPress()
    }
  }
  render() {
    var renderTitle = () => {
      return (
        <Text
          style={STYLES.pgTitle}
          >
          {this.props.title}
        </Text>
        )
    }
    var renderButton = (side) => {
      var buttonType
      if(side == 'LEFT'){
        buttonType = this.props.left
      } else {
        buttonType = this.props.right
      }
      switch(buttonType){
        case 'CLOSE':
          return (
            <CloseButton onPress={() => this.handlePress(side)}/>
          )
          break;
        case 'PROFILE':
          return (
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 35 /2,
                backgroundColor: GLOBALS.grey,
                margin: 5,
                marginLeft: 10
              }}
              />
          )
          break;
        case 'PLUS':
          return (

            <TouchableOpacity
              onPress={() => this.handlePress(side)}
              style={{
                margin: 5,
                marginRight: 10
              }}
              >
              <AntDesign name={'plus'} size={35} color={GLOBALS.grey}/>
            </TouchableOpacity>
          )
          break;
        default:
          return (
            <View style={styles.none}/>
          )
          break;
      }
    }
    return (
      <Transition appear={FadeIn} disappear={FadeOut}>
        <SafeAreaView
          style={[
            this.props.style,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: GLOBALS.screenWidth
            }
          ]}
          >
          <View
            style={styles.buttonWrapper}
            >
            {renderButton('LEFT')}
          </View>
          {renderTitle()}
          <View
            style={styles.buttonWrapper}
            >
            {renderButton('RIGHT')}
          </View>

        </SafeAreaView>
      </Transition>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonWrapper: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
});


module.exports = TopBar;
