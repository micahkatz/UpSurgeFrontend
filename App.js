import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

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
apiName = 'evtApi'
apiPath = '/evtApi'
const uuidv4 = require('uuid/v4');

import {NewEvt} from './src/funcs/NewEvt'
import {FetchEvts} from './src/funcs/evtFeed'
import {StoreUID} from './src/funcs/auth'

class App extends Component<Props> {

  state = { apiResponse: null, jwt: null, LastEvaluatedKey: null, evtList: null };

  componentDidMount() {
    Auth.currentSession()
      .then(res => {
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        StoreUID(jwt)
        this.setState({jwt})
      })
      .catch(() => console.log('Not signed in'));
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

  async insertItem() {
    let config = {
      body: {
        eid: uuidv4(),
        title: 'example',
        desc: 'example text',
        ts: Math.round((new Date()).getTime() / 1000),
        uid: this.state.jwt,
        cats: ['SPORTS', 'MUSIC']
      }
    }

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put(apiName, apiPath, config)
      console.log('response from saving note: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  async delItem() {
    try {
      //deletes the item with a certain id
      const apiResponse = await API.del(apiName, apiPath + '/object/123467')
      console.log('response from saving note: ' + JSON.stringify(apiResponse));
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }
  async getItem() {
    try {
      const apiResponse = await API.get(apiName, apiPath + '/object/123467')
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

  async uploadImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      forceJpg: true,
      includeBase64: true
    }).then(image => {
      Storage.put(image.filename, image.data, {
        contentType: image.mime
      })
      .then (result => {
        this.setState({apiResponse: 'THE IMAGE HAS BEEN UPLOADED!!'});
        console.log(result)
      })
      .catch(err => {
        this.setState({apiResponse: 'Error'+err});
        console.log(err)
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to UpSurge!</Text>
        <Button title='PUT Request' onPress={() => NewEvt()} />
        <Button title='DEL Request' onPress={this.delItem.bind(this)} />
        <Button title='GET Request' onPress={this.getItem.bind(this)} />
        <Button title='SCAN Request' onPress={this.scanItems.bind(this)} />
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
