/*
  EvtSubFeed.js contains the Feed of SUBMISSIONS that are in an EVENT
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import ExtSub from 'src/comps/ExtSub';
import {GLOBALS} from 'src/globals'
import {GetEvtSubs} from 'src/funcs/subFeed'
import NothingYet from 'src/comps/nothingYet'
import {
  Transition
} from 'react-navigation-fluid-transitions';


export default class EvtSubFeed extends Component {
  constructor(props){
    super(props)
    this.state = {
      subList: [],
      LastEvaluatedKey: null,
      refreshing: false,
      loadingMore: false, // if the user has reached the bottom of the list
      noneLeft: false // if there are no more evts to render
    }
    this.getRefreshing = this.getRefreshing.bind(this)
    this.props.onRef(this)
  }
  getRefreshing(){
    return this.state.refreshing
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  async handleRefresh() {
    this.setState({
      subList: [],
      noneLeft: false,
      refreshing: true
    })
    try {
      returnedData = await GetEvtSubs(this.props.eid)
      if(returnedData){
        if(returnedData.LastEvaluatedKey){

          newSubs = returnedData.data
          LastEvaluatedKey = returnedData.LastEvaluatedKey
          this.setState((prevState, props) => ({
            LastEvaluatedKey,
            // adds the new array of items to the previos array if the previos array contains items
            subList: (prevState.subList) ? [...prevState.subList, ...newSubs] : newSubs,
            refreshing: false
          }));
        } else {
          newSubs = returnedData.data
          this.setState((prevState, props) => ({
            LastEvaluatedKey: null,
            noneLeft: true,
            // adds the new array of items to the previos array if the previos array contains items
            subList: (prevState.subList) ? [...prevState.subList, ...newSubs] : newSubs,
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
        this.setState({
          loadingMore: true
        })
        returnedData = await GetEvtSubs(this.props.eid)
        if(returnedData){
          if(returnedData.LastEvaluatedKey.sid){

            newSubs = returnedData.data
            LastEvaluatedKey = returnedData.LastEvaluatedKey
            this.setState((prevState, props) => ({
              LastEvaluatedKey,
              // adds the new array of items to the previos array if the previos array contains items
              subList: (prevState.subList) ? [...prevState.subList, ...newSubs] : newSubs,
              refreshing: false,
              loadingMore: false
            }));
          } else {
            newSubs = returnedData.data
            this.setState((prevState, props) => ({
              LastEvaluatedKey: null,
              noneLeft: true,
              // adds the new array of items to the previos array if the previos array contains items
              subList: (prevState.subList) ? [...prevState.subList, ...newSubs] : newSubs,
              refreshing: false,
              loadingMore: false
            }));
          }
        } else {
          this.setState({
            refreshing: false,
            noneLeft: true,
            loadingMore: false
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
        contentContainerStyle={{
          padding: 5
        }}
        data={this.state.subList}
        keyExtractor = {(item, index) => item.sid}
        renderItem={({item, index}) => {
          return (
            <ExtSub item={item}/>
          )
        }}
        numColumns={3}
        refreshing={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        bouncesZoom={true}
        decelerationRate={true}
        onRefresh={this.handleRefresh.bind(this)}
        onEndReached={this.handleBottomReached.bind(this)}
        ListHeaderComponent={() => {
          if(this.state.subList.length > 0){
            return (
              <View/>
            )
          } else {
            return (
              <View>
                <NothingYet text={'Nothing to Show'}/>
              </View>
            )
          }
        }}
        ListFooterComponent={() => {
          if(this.state.loadingMore == true){
            return(
              <View style={{margin: 10}}>
                <ActivityIndicator size="small" />
              </View>
            )
          } else {
            return (
              <View/>
            )
          }
        }}
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
