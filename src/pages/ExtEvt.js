import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {GLOBALS} from '../globals'
import {STYLES} from '../styles'
import {GetIMG} from '../funcs/media'
import {getTimestamp} from '../funcs/common'
import { BlurView } from "@react-native-community/blur";
import Gradient from '../comps/Gradient'
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
              item: {...this.props.item, numSubs: '321'}
            })
          }}
          >
          <View
            style={{
              borderRadius: 15,
              overflow: 'hidden',
              height: GLOBALS.extEvtHeight,
              width: GLOBALS.extEvtWidth,
              marginVertical: 10,
              backgroundColor: GLOBALS.lightGrey
            }}
            >
            <View>
              <Transition shared={this.props.item.eid}>
                <Image
                  style={{ height: GLOBALS.extEvtHeight, width: GLOBALS.extEvtWidth}}
                  source={{ uri: this.state.imgUri}}
                  />
              </Transition>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: GLOBALS.extEvtWidth
                }}
                >
                <View>
                  <Gradient
                    style={{
                      width: GLOBALS.extEvtWidth,
                      height: 100,
                      position: 'absolute'
                    }}
                    />
                  <Transition shared={this.props.item.eid + '-title'}>
                    <Text
                      style={[
                        STYLES.evtTitle,
                        {margin: 10}
                      ]}
                      >
                      {this.props.item.title.toUpperCase()}
                    </Text>
                  </Transition>
                </View>
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
                    <Transition shared={this.props.item.eid + '-numsubs'}>
                      <Text
                        style={{
                          color: GLOBALS.darkGrey,
                          fontSize: 16,
                          fontWeight: 'bold'
                        }}
                        >
                        321 Posts
                      </Text>
                    </Transition>
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
