/*
  * IntEvt.js contains the Interior event page
*/

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
import {STYLES} from '../styles'
import CloseButton from '../comps/CloseButton'
import EvtSubFeed from './EvtSubFeed';
import {GetIMG} from '../funcs/media'
import Gradient from '../comps/Gradient'
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
        <View>
          <Transition shared={item.eid}>
            <Image
              style={{ height: GLOBALS.extEvtHeight / 2, width: GLOBALS.screenWidth}}
              source={{ uri: imgUri}}
              />
          </Transition>
          <View style={{
              width: GLOBALS.extEvtWidth,
              height: 100,
              bottom: 0,
              position: 'absolute'
            }}>
            <Transition shared={item.eid + '-gradient'}>
              <Gradient
                style={{
                  width: GLOBALS.screenWidth,
                  height: 100
                }}
                />
            </Transition>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: GLOBALS.extEvtWidth * .7,
              padding: 20
            }}
            >
            <Transition shared={item.eid + '-title'}>
              <Text
                style={STYLES.evtTitle}
                >
                {item.title.toUpperCase()}
              </Text>
            </Transition>
            <Transition shared={item.eid + '-numsubs'}>
              <Text
                style={{
                  color: GLOBALS.lightGrey,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
                >
                {item.numSubs} Posts - {item.cat}
              </Text>
            </Transition>
          </View>
        </View>
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
            padding: 20
          }}
          >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: GLOBALS.grey
            }}
            >
            Description
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10
            }}
            >
            {item.desc}
          </Text>
          <Button
            title={'Profile'}
            onPress={() =>  this.props.navigation.push('Profile', {
              item
            })}
            >
          </Button>
        </View>
        <EvtSubFeed eid={item.eid}/>
      </ScrollView>
    );
  }
}


module.exports = IntEvt;
