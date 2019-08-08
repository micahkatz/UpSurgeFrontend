import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {GLOBALS} from '../globals'
import {GetIMG} from '../funcs/media'
import {getTimestamp} from '../funcs/common'
import { BlurView } from "@react-native-community/blur";
import {
  Transition
} from 'react-navigation-fluid-transitions';
export default class ExtSub extends Component {
  constructor(props){
    super(props)
    this.state = {
      imgUri: null
    }
  }
  componentDidMount(){
    this.setUri()
  }
  async setUri(){
    let imgUri = await GetIMG(this.props.item.sid + '.jpeg')
    this.setState({
      imgUri
    })
  }
  render() {
    return (
      <View style={{
          alignItems: 'center',
          marginBottom: 5,
          flex: 1/3
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.push('IntEvt', {
              imgUri: this.state.imgUri,
              item: {...this.props.item, numSubs: '321'}
            })
          }}
          >
          <View
            style={{
              width: GLOBALS.extSubWidth,
              height: GLOBALS.extSubHeight,
              backgroundColor: GLOBALS.lightGrey
            }}
            >
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
