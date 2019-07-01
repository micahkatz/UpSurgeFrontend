import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import EvtContainer from './EvtContainer'
import {GLOBALS} from '../globals'
import IntEvt from './IntEvt'
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
    let imgUri = await GetIMG(this.props.item.eid + '.jpeg')
    this.setState({
      imgUri
    })
  }
  render() {
    return (
      <EvtContainer
        backgroundColor={'black'}
        style={{
          marginVertical: 15
        }}
        intEvtChildren={<IntEvt item={this.props.item} navigation={this.props.navigation}/>}
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
