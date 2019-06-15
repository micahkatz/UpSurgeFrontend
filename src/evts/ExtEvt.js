import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import EvtContainer from './EvtContainer'
import {GLOBALS} from '../globals'

import {GetIMG} from '../funcs/media'
class ExtEvt extends Component {
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
    let imgUri = await GetIMG(this.props.eid + '.jpeg')
    this.setState({
      imgUri
    })
  }
  render() {
    return (
      <EvtContainer
        backgroundColor={'black'}
        style={{
          marginVertical: 10
        }}
        >
        <Image
          style={{ height: GLOBALS.extEvtHeight, width: GLOBALS.screenWidth, position: 'absolute'}}
          source={{ uri: this.state.imgUri}}
          />
      </EvtContainer>
    );
  }
}


module.exports = ExtEvt;
