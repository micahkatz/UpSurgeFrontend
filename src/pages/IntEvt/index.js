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
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {GLOBALS} from 'src/globals'
import {STYLES} from 'src/styles'
import {FadeIn, FadeOut} from 'src/animations'
import CloseButton from 'src/comps/CloseButton'
import EvtSubFeed from './EvtSubFeed';
import {GetIMG} from 'src/funcs/media'
import {NewSub} from 'src/funcs/NewSub'
import Gradient from 'src/comps/Gradient'
import TopBar from 'src/comps/TopBar'
import TagFeed from 'src/comps/TagFeed'
import {
  Transition
} from 'react-navigation-fluid-transitions';
class IntEvt extends Component {
  constructor(props){
    super(props)
    this.state = {
      refreshing: false
    }
    this.refs = {}
  }
  render() {
    const imgUri = this.props.navigation.getParam('imgUri');
    const item = this.props.navigation.getParam('item');
    return (
      <ScrollView
        style={{
          flex: 1
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.evtsubfeed.handleRefresh().then(() => this.setState({refreshing:false}))}
            />
        }
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
              width: GLOBALS.screenWidth,
              padding: 20
            }}
            >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
              }}
              >
              <View>
                <Transition shared={item.eid + '-title'}>
                  <Text
                    style={STYLES.evtTitle}
                    >
                    {item.title.toUpperCase()}
                  </Text>
                </Transition>
                <Transition appear={FadeIn}>
                  <Text
                    style={{
                      color: '#e2e2e2',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                    >
                    {item.numSubs} {(item.numSubs == 1) ? 'Post' : 'Posts'}
                  </Text>
                </Transition>
              </View>
              <TouchableOpacity
                style={STYLES.button}
                onPress={() => NewSub(item.eid)}
                >
                <Text
                  style={{
                    fontFamily: 'HelveticaNeue',
                    fontWeight: 'bold',
                    color: GLOBALS.white
                  }}
                  >
                  POST
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: GLOBALS.grey,
            marginTop: 20,
            marginHorizontal: 20,
          }}
          >
          Tags
        </Text>
        <TagFeed
          data={item.tags}
          style={{
            alignSelf: 'center',
            height: 80
          }}
          />
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
        <EvtSubFeed
          eid={item.eid}
          onRef={ref => (this.evtsubfeed = ref)}
          />
        <TopBar
          left={'CLOSE'}
          leftPress={this.props.navigation.pop}
          style={{
            position: 'absolute'
          }}
          />
      </ScrollView>
    );
  }
}


module.exports = IntEvt;
