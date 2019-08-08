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
import ExtEvt from './ExtEvt';
import {GLOBALS} from '../globals'
import NothingYet from '../comps/nothingYet'
import {FetchEvts} from '../funcs/evtFeed'
import {
  Transition
} from 'react-navigation-fluid-transitions';
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      evtList: [], // to store the list of events
      LastEvaluatedKey: null, // to store the last id of the current feed
      refreshing: false, // to show when the client refreshes the feed
      loading: true, // to show loading at the first render
      loadingMore: false, // to show when the client is fetching more data
      noneLeft: false // if there are no more evts to render
    }
  }
  componentDidMount(){
    this.handleRefresh()
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
            loading: false,
            refreshing: false
          }));
        } else {
          newEvents = returnedData.data
          this.setState((prevState, props) => ({
            LastEvaluatedKey: null,
            noneLeft: true,
            // adds the new array of items to the previos array if the previos array contains items
            evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
            loading: false,
            refreshing: false
          }));
        }
      } else {
        this.setState({
          refreshing: false,
          loading: false,
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
        this.setState({loadingMore: true})
        returnedData = await FetchEvts(this.state.LastEvaluatedKey)
        if(returnedData){
          if(returnedData.LastEvaluatedKey){

            newEvents = returnedData.data
            LastEvaluatedKey = returnedData.LastEvaluatedKey
            this.setState((prevState, props) => ({
              LastEvaluatedKey,
              // adds the new array of items to the previos array if the previos array contains items
              evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
              refreshing: false,
              loadingMore: false
            }));
          } else {
            newEvents = returnedData.data
            this.setState((prevState, props) => ({
              LastEvaluatedKey: null,
              noneLeft: true,
              // adds the new array of items to the previos array if the previos array contains items
              evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents,
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
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
          <Button
            title={'Profile'}
            />
          <Button
            title={'New Evt'}
            onPress={() => this.props.navigation.push('NewEvt')}
            />
        </View>
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
          ListHeaderComponent={() => {
            if(this.state.loading){
              return (
                <View style={{margin: 10}}>
                  <ActivityIndicator size={'large'} />
                </View>
              )
            } else if (this.state.evtList.length > 0){
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

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

module.exports = Home;
