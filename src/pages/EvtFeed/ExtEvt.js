/*
  * ExtEvt.js contains the exterior event component
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {GLOBALS} from 'src/globals'
import {FadeIn, FadeOut} from 'src/animations'
import {STYLES} from 'src/styles'
import {GetIMG} from 'src/funcs/media'
import {getTimestamp} from 'src/funcs/common'
import { BlurView } from "@react-native-community/blur";
import Gradient from 'src/comps/Gradient'
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
              height: GLOBALS.extEvtHeight,
              width: GLOBALS.extEvtWidth,
              marginVertical: 10,
              backgroundColor: GLOBALS.lightGrey,
              borderRadius: 15,
              overflow: 'hidden'
            }}
            >
            <View>
              <Image
                style={{
                  height: GLOBALS.extEvtHeight,
                  width: GLOBALS.extEvtWidth
                }}
                source={{ uri: this.state.imgUri}}
                />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: GLOBALS.extEvtWidth
                }}
                >
                <View>
                  <View style={{
                      width: GLOBALS.extEvtWidth,
                      height: 100,
                      position: 'absolute'
                    }}>
                    <Gradient
                      style={{
                        width: GLOBALS.extEvtWidth,
                        height: 100
                      }}
                      />
                  </View>
                  <Text
                    style={[
                      STYLES.evtTitle,
                      {margin: 10}
                    ]}
                    >
                    {this.props.item.title.toUpperCase()}
                  </Text>
                </View>
                <View
                  style={{
                    width: GLOBALS.extEvtWidth
                  }}
                  >
                  <BlurView
                    style={{
                      width: GLOBALS.extEvtWidth,
                      borderBottomLeftRadius:15,
                      borderBottomRightRadius:15,
                    }}
                    blurType="xlight"
                    blurAmount={50}
                    >
                    <View
                      style={{
                        padding: 15,
                        paddingVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center'

                      }}
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
                            color: GLOBALS.darkGrey,
                            fontSize: 16,
                            fontWeight: 'bold'
                          }}
                          >
                          {this.props.item.numSubs} {(this.props.item.numSubs == 1) ? 'Post' : 'Posts'}
                        </Text>
                        <Text
                          style={{
                            color: '#6a6a6a',
                            fontSize: 16
                          }}
                          >
                          {getTimestamp(this.props.item.ts)}
                        </Text>
                      </View>
                    </View>
                  </BlurView>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


module.exports = ExtEvt;
