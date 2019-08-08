import React, {Component} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import {StoreUID} from './src/funcs/auth'
import { withAuthenticator } from 'aws-amplify-react-native';
import Nav from './src/nav'
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

/*
  App.js is the MAIN file for the entire app, which handles authenticaiton
  and then lets nav.js handle the rest
*/

class App extends Component<Props> {

  // when the app is "mounted" or opened, App.js checks if the user is logged in
  componentDidMount(){
    Auth.currentSession()
      .then(res => {
        return Auth.currentAuthenticatedUser()
      })
      .then((user) => {
        // put the userID into the phone storage
        StoreUID(user.username)
      })
      .catch(() => console.log('Not signed in'));
  }
  render(){
    return (
      <Nav/>
    )
  }
}

export default withAuthenticator(App, {
  includeGreetings: false
});
