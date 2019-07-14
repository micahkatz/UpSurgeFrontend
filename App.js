import React, {Component} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import StoreUID from './src/funcs/auth'
import { withAuthenticator } from 'aws-amplify-react-native';
import Nav from './src/nav'
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class App extends Component<Props> {
  componentDidMount(){
    Auth.currentSession()
      .then(res => {
        return Auth.currentAuthenticatedUser()
      })
      .then((user) => {
        console.log('HERE IS THE USSER', user.username)
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
  includeGreetings: true
});
