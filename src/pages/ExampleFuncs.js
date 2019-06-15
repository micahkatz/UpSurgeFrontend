import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, ScrollView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
import Amplify, {Auth, API, Storage} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import awsconfig from '../../aws-exports';
import ImagePicker from 'react-native-image-crop-picker';
Amplify.configure(awsconfig);
import RNFetchBlob from 'rn-fetch-blob'
apiName = 'EvtsApi'
apiPath = '/e'
const uuidv4 = require('uuid/v4');
import {NewSub} from '../funcs/NewSub'
import {FetchEvts} from '../funcs/evtFeed'
import {GetCatFeed} from '../funcs/evtFeed'
import {GetProEvtFeed} from '../funcs/evtFeed'
import {GetEvtSubs} from '../funcs/subFeed'
import {GetProSubs} from '../funcs/subFeed'
import {StoreUID} from '../funcs/auth'
import {AddFriend} from '../funcs/addFriend'
import {GetProfile} from '../funcs/profile'
import {EditProfile} from '../funcs/profile'
import {ZapSub} from '../funcs/zapSub'
import {UploadImg} from '../funcs/media'
import {
  NewActEvt,
  NewChanceEvt,
  NewZBEvt,
  NewTrivEvt
} from '../funcs/NewEvt'

class ExampleFuncs extends Component<Props> {

  state = { apiResponse: null, jwt: null, LastEvaluatedKey: null,LastEvaluatedCatKey: null, LastEvaluatedProEvtKey: null, LastEvaluatedEvtSubKey: null, evtList: null, imgSrc: null };

  componentDidMount() {
    Auth.currentSession()
      .then(res => {
        console.log('HERE IS THE RESULT OF AUTH', res)
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        StoreUID(jwt)
        this.setState({jwt})
      })
      .catch(() => console.log('Not signed in'));
    Storage.get('abc.png')
    .then((imgSrc) => {
      this.setState({imgSrc})
    })
  }
  async testGet() {
    try {
      const apiResponse = await API.put(apiName, apiPath)
      console.log('res: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }

  async delItem() {
    try {
      //deletes the item with a certain id
      const apiResponse = await API.del(apiName, apiPath + '/1485953d-7736-4434-9a73-489930a3ebfa')
      console.log('response from deleting evt: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  async getItem() {
    try {
      const apiResponse = await API.get('UserApi', '/u')
      console.log('response from saving note: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  async searchDb() {
    try {
      const apiResponse = await API.get('UserApi', '/u/search/' + 'example')
      console.log('response from searching: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  async scanItems() {
    try {
      returnedData = await FetchEvts(this.state.LastEvaluatedKey)
      if(returnedData){
        newEvents = returnedData.data
        LastEvaluatedKey = returnedData.LastEvaluatedKey
        this.setState((prevState, props) => ({
          apiResponse: 'last evaluated: ' + LastEvaluatedKey,
          LastEvaluatedKey,
          // adds the new array of items to the previos array if the previos array contains items
          evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents
        }));
      } else {
        this.setState({apiResponse: 'error'})
      }
    } catch (e) {
      this.setState({apiResponse: e})
      console.log(e);
    }
  }
  async fetchCatFeed() {
    try {
      returnedData = await GetCatFeed(this.state.LastEvaluatedCatKey)
      if(returnedData){
        newEvents = returnedData.data
        LastEvaluatedCatKey = returnedData.LastEvaluatedKey
        this.setState((prevState, props) => ({
          apiResponse: 'last evaluated: ' + LastEvaluatedCatKey,
          LastEvaluatedCatKey,
          // adds the new array of items to the previos array if the previos array contains items
          evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents
        }));
      } else {
        this.setState({apiResponse: 'error'})
      }
    } catch (e) {
      this.setState({apiResponse: e})
      console.log(e);
    }
  }
  async fetchProfileEvtFeed() {
    try {
      returnedData = await GetProEvtFeed('eyJraWQiOi', this.state.LastEvaluatedProEvtKey)
      if(returnedData){
        newEvents = returnedData.data
        LastEvaluatedProEvtKey = returnedData.LastEvaluatedKey
        this.setState((prevState, props) => ({
          apiResponse: 'last evaluated: ' + LastEvaluatedProEvtKey,
          LastEvaluatedProEvtKey,
          // adds the new array of items to the previos array if the previos array contains items
          evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents
        }));
      } else {
        this.setState({apiResponse: 'error'})
      }
    } catch (e) {
      this.setState({apiResponse: e})
      console.log(e);
    }
  }
  async fetchEvtSubFeed() {
    try {
      returnedData = await GetEvtSubs('a18ecef2-be17-4169-9271-a7189c3cface', this.state.LastEvaluatedEvtSubKey)
      if(returnedData){
        newEvents = returnedData.data
        LastEvaluatedEvtSubKey = returnedData.LastEvaluatedKey
        this.setState((prevState, props) => ({
          apiResponse: 'last evaluated: ' + LastEvaluatedEvtSubKey,
          LastEvaluatedEvtSubKey,
          // adds the new array of items to the previos array if the previos array contains items
          evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents
        }));
      } else {
        this.setState({apiResponse: 'error'})
      }
    } catch (e) {
      this.setState({apiResponse: e})
      console.log(e);
    }
  }
  async fetchProSubFeed() {
    try {
      returnedData = await GetProSubs('eyJraWQiOi', this.state.LastEvaluatedEvtSubKey)
      if(returnedData){
        newEvents = returnedData.data
        LastEvaluatedEvtSubKey = returnedData.LastEvaluatedKey
        this.setState((prevState, props) => ({
          apiResponse: 'last evaluated: ' + LastEvaluatedEvtSubKey,
          LastEvaluatedEvtSubKey,
          // adds the new array of items to the previos array if the previos array contains items
          evtList: (prevState.evtList) ? [...prevState.evtList, ...newEvents] : newEvents
        }));
      } else {
        this.setState({apiResponse: 'error'})
      }
    } catch (e) {
      this.setState({apiResponse: e})
      console.log(e);
    }
  }

  async pickImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      forceJpg: false,
      includeBase64: true
    }).then(image => {
      this.uploadImg(image)
    });
  }
  async uploadImg(image) {
    let uri = image.path
    const response = await fetch(uri)
    const blob = await response.blob() // format the data for images
    Storage.put('testing.jpeg', blob, {
      contentType: image.mime
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Button title='*New Activity Evt' onPress={() => NewActEvt()} />
        <Button title='*New Chance Evt' onPress={() => NewChanceEvt()} />
        <Button title='*New ZBook Evt' onPress={() => NewZBEvt()} />
        <Button title='*New Trivia Evt' onPress={() => NewTrivEvt()} />
        <Button title='*New Sub' onPress={() => NewSub('a18ecef2-be17-4169-9271-a7189c3cface')} />
        <Button title='*DEL Request' onPress={this.delItem.bind(this)} />
        <Button title='*GET Request' onPress={this.getItem.bind(this)} />
        <Button title='*Get Event Feed' onPress={this.scanItems.bind(this)} />
        <Button title='*ADD FRIEND' onPress={() => AddFriend()} />
        <Button title='*Get SPORTS FEED' onPress={this.fetchCatFeed.bind(this)} />
        <Button title='*Get Profile Evt FEED' onPress={this.fetchProfileEvtFeed.bind(this)} />
        <Button title='*Get Profile' onPress={() => GetProfile('eyJraWQiOi')} />
        <Button title='*Get Evt Submissions' onPress={this.fetchEvtSubFeed.bind(this)} />
        <Button title='*Get Profile Submissions' onPress={this.fetchProSubFeed.bind(this)} />
        <Button title='*Edit Profile' onPress={() => EditProfile()} />
        <Button title='*Zap Sub' onPress={() => ZapSub('03303a4d-9b65-409f-8bbe-8453df3f425b')} />
        <Button title='*Upload IMG' onPress={() => UploadImg()} />
        <Button title='*Search' onPress={this.searchDb.bind(this)} />
        <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        {
          this.state.evtList != null
          ?
          <View>
            {
              this.state.evtList.map((item) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 10
                    }}
                    key={item.eid}>
                    <Text>{item.eid}</Text>
                  </View>
                )
              })
            }
          </View>
          :
          <View/>

        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default ExampleFuncs
