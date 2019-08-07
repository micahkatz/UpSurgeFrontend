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
import {
  Transition
} from 'react-navigation-fluid-transitions';
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
      <View style={{
          marginVertical: 5
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.push('IntEvt', {
              imgUri: this.state.imgUri,
              item: this.props.item
            })
          }}
          >
          <View
            style={{
              borderRadius: 15, overflow: 'hidden', height: GLOBALS.extEvtHeight, width: GLOBALS.extEvtWidth, marginVertical: 10
            }}
            >
            <Transition shared={this.props.item.eid}>
              <Image
                style={{ height: GLOBALS.extEvtHeight, width: GLOBALS.extEvtWidth}}
                source={{ uri: this.state.imgUri}}
                />
            </Transition>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <Text>
            {this.props.item.title}
          </Text>
        </View>
      </View>
    );
  }
}


module.exports = ExtEvt;
