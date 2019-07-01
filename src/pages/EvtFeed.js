import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button
} from 'react-native';
import ExtEvt from '../evts/ExtEvt';
import {GLOBALS} from '../globals'
import {FetchEvts} from '../funcs/evtFeed'
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      evtList: [],
      LastEvaluatedKey: null,
      refreshing: false,
      noneLeft: false // if there are no more evts to render
    }
  }
  async handleRefresh() {
    this.setState({
      evtList: [],
      noneLeft: false,
      refreshing: true
    })
    try {
      returnedData = await FetchEvts()
      if(returnedData){
        if(returnedData.LastEvaluatedKey){

          newEvents = returnedData.data
          LastEvaluatedKey = returnedData.LastEvaluatedKey
          this.setState((prevState, props) => ({
            LastEvaluatedKey,
            // adds the new array of items to the previos array if the previos array contains items
            evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
            refreshing: false
          }));
        } else {
          newEvents = returnedData.data
          this.setState((prevState, props) => ({
            LastEvaluatedKey: null,
            noneLeft: true,
            // adds the new array of items to the previos array if the previos array contains items
            evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
            refreshing: false
          }));
        }
      } else {
        this.setState({
          refreshing: false,
          noneLeft: true
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
  async handleBottomReached() {
    if(this.state.noneLeft == false){
      try {
        returnedData = await FetchEvts(this.state.LastEvaluatedKey)
        if(returnedData){
          if(returnedData.LastEvaluatedKey){

            newEvents = returnedData.data
            LastEvaluatedKey = returnedData.LastEvaluatedKey
            this.setState((prevState, props) => ({
              LastEvaluatedKey,
              // adds the new array of items to the previos array if the previos array contains items
              evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
              refreshing: false
            }));
          } else {
            newEvents = returnedData.data
            this.setState((prevState, props) => ({
              LastEvaluatedKey: null,
              noneLeft: true,
              // adds the new array of items to the previos array if the previos array contains items
              evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
              refreshing: false
            }));
          }
        } else {
          this.setState({
            refreshing: false,
            noneLeft: true
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.state.evtList}
        keyExtractor = {(item, index) => item.eid}
        renderItem={({item, index}) => {
          return (
            <ExtEvt item={item} navigation={this.props.navigation}/>
          )
        }}
        refreshing={this.state.refreshing}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        bouncesZoom={true}
        decelerationRate={true}
        onRefresh={this.handleRefresh.bind(this)}
        onEndReached={this.handleBottomReached.bind(this)}
        >
      </FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

module.exports = Home;
