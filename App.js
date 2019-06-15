import React, {Component} from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import Nav from './src/nav'
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

class App extends Component<Props> {
  render(){
    return (
      <Nav/>
    )
  }
}

export default withAuthenticator(App, {
  includeGreetings: false
});
