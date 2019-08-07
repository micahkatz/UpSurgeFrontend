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
              borderRadius: 15,
              overflow: 'hidden',
              height: GLOBALS.extEvtHeight,
              width: GLOBALS.extEvtWidth,
              marginVertical: 10
            }}
            >
            <View>
              <Transition shared={this.props.item.eid}>
                <View>
                  <Image
                    style={{ height: GLOBALS.extEvtHeight, width: GLOBALS.extEvtWidth}}
                    source={{ uri: this.state.imgUri}}
                    />
                </View>
              </Transition>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: GLOBALS.extEvtWidth
                }}
                >
                <Text
                  style={{
                    fontSize: 40,
                    color: 'white',
                    fontWeight: 'bold',
                    margin: 10,
                    width: GLOBALS.extEvtWidth * .6
                  }}
                  >
                  {this.props.item.title.toUpperCase()}
                </Text>
                <BlurView
                  style={{
                    width: GLOBALS.extEvtWidth,
                    padding: 15,
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                  blurType="xlight"
                  blurAmount={50}
                  >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      margin: 10
                    }}
                    source={{uri: 'ActEvt'}}
                    />
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold'
                      }}
                      >
                      321 Posts
                    </Text>
                    <Text
                      style={{
                        color: '#6a6a6a',
                        fontSize: 16
                      }}
                      >
                      {getTimestamp(this.props.item.ts).toUpperCase()}
                    </Text>
                  </View>
                </BlurView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


module.exports = ExtEvt;
