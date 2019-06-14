import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
import Amplify, {Auth, API, Storage} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import awsconfig from './aws-exports';
import ImagePicker from 'react-native-image-crop-picker';
Amplify.configure(awsconfig);
import RNFetchBlob from 'rn-fetch-blob'
apiName = 'EvtsApi'
apiPath = '/e'
const uuidv4 = require('uuid/v4');
import {NewEvt} from './src/funcs/NewEvt'
import {NewSub} from './src/funcs/NewSub'
import {FetchEvts} from './src/funcs/evtFeed'
import {GetCatFeed} from './src/funcs/evtFeed'
import {GetProEvtFeed} from './src/funcs/evtFeed'
import {GetEvtSubs} from './src/funcs/subFeed'
import {StoreUID} from './src/funcs/auth'
import {AddFriend} from './src/funcs/addFriend'
import {GetProfile} from './src/funcs/profile'
import {EditProfile} from './src/funcs/profile'

class App extends Component<Props> {

  state = { apiResponse: null, jwt: null, LastEvaluatedKey: null,LastEvaluatedCatKey: null, LastEvaluatedProEvtKey: null, LastEvaluatedEvtSubKey: null, evtList: null, imgSrc: null };

  componentDidMount() {
    Auth.currentSession()
      .then(res => {
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
        LastEvaluatedCatKey = returnedData.LastEvaluatedCatKey
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
        LastEvaluatedProEvtKey = returnedData.LastEvaluatedProEvtKey
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
        LastEvaluatedEvtSubKey = returnedData.LastEvaluatedEvtSubKey
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

  async uploadImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      forceJpg: false,
      includeBase64: true
    }).then(image => {
      Storage.put(uuidv4() + '.jpeg', image.data, {
        contentType: image.mime
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to UpSurge!</Text>
        <Button title='*PUT Request' onPress={() => NewEvt()} />
        <Button title='*New Sub' onPress={() => NewSub('a18ecef2-be17-4169-9271-a7189c3cface')} />
        <Button title='*DEL Request' onPress={this.delItem.bind(this)} />
        <Button title='*GET Request' onPress={this.getItem.bind(this)} />
        <Button title='*Get Event Feed' onPress={this.scanItems.bind(this)} />
        <Button title='*ADD FRIEND' onPress={() => AddFriend()} />
        <Button title='*Get SPORTS FEED' onPress={this.fetchCatFeed.bind(this)} />
        <Button title='*Get Profile Evt FEED' onPress={this.fetchProfileEvtFeed.bind(this)} />
        <Button title='*Get Profile' onPress={() => GetProfile('eyJraWQiOi')} />
        <Button title='*Get Evt Submissions' onPress={this.fetchEvtSubFeed.bind(this)} />
        <Button title='*Edit Profile' onPress={() => EditProfile()} />
        <Button title='Zap Sub' onPress={() => ZapSub('')} />
        <Button title='Upload IMG' onPress={this.uploadImg.bind(this)} />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default withAuthenticator(App, {
  includeGreetings: true
});
