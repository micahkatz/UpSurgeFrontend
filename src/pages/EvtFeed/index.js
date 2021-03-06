/*
EvtFeed.js contains the Feed of EVENTS in a FlatList
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import ExtEvt from './ExtEvt';
import {GLOBALS} from 'src/globals'
import NothingYet from 'src/comps/nothingYet'
import {FetchEvts} from 'src/funcs/evtFeed'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TopBar from 'src/comps/TopBar'
import {ProfileButton, NewEvt} from 'src/buttons/evtFeedBtns'
import PageTitle from 'src/comps/pageTitle'

export default class EvtFeed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <PageTitle>Home</PageTitle>,
      headerLeft: (
        <ProfileButton
          onPress={() => navigation.navigate('Profile')}
          title={'Button'}
        />
      ),
      headerRight: (
        <NewEvt
          onPress={() => navigation.navigate('NewEvt')}
          title={'Button'}
        />
      ),
      headerStyle: {
        borderBottomWidth: 0,
        paddingBottom: 5
      }
    };
  };
  constructor(props){
    super(props)
    this.state = {
      evtList: [], // to store the list of events
      LastEvaluatedKey: null, // to store the last id of the current feed
      refreshing: false, // to show when the client refreshes the feed
      loading: true, // to show loading at the first render
      loadingMore: false, // to show when the client is fetching more data
      noneLeft: false, // if there are no more evts to render
      headerHeight: GLOBALS.headerHeight
    }
  }

  // when EvtFeed is mounted, the feed is automatically refreshed
  componentDidMount(){
    this.handleRefresh()
  }
  async handleRefresh() {
    this.setState({
      evtList: [],
      noneLeft: false,
      refreshing: true,
      headerHeight: GLOBALS.headerHeight
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
      <View>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center'
          }}
          data={this.state.evtList}
          keyExtractor = {(item, index) => item.eid}
          renderItem={({item, index}) => {
            return (
              <ExtEvt item={item} navigation={this.props.navigation}/>
            )
          }}
          refreshing={this.state.refreshing}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator
          automaticallyAdjustContentInsets={false}
          bouncesZoom={true}
          decelerationRate={true}
          onRefresh={this.handleRefresh.bind(this)}
          onEndReached={this.handleBottomReached.bind(this)}
          ListHeaderComponent={() => {
            if(this.state.loading){
              return (
                <View style={{
                    flex: 1,
                    height: GLOBALS.screenHeight - 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

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
          />
      </View>
    );
  }
}
