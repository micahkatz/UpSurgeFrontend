import React from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import EvtFeedScreen from './pages/EvtFeed'
import ExampleFuncs from './pages/ExampleFuncs'
import IntEvtScreen from './pages/IntEvt'
import ProfileScreen from './pages/Profile'
import {
  createFluidNavigator,
  Transition
} from 'react-navigation-fluid-transitions';

class SubFeedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Transition shared="example">
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100 / 2,
              width: 100,
              height: 100
            }}
            />
        </Transition>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.push('Lb')
          }}
          >
          <Text>ExampleText</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
class LbScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Transition shared="example">
          <View
            style={{
              borderWidth: 1,
              borderRadius: 150 / 2,
              width: 150,
              height: 150
            }}
            />
        </Transition>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.goBack()
          }}
          >
          <Text style={{
              fontSize: 40
            }}>
            ExampleText
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const EvtStack = createFluidNavigator({
  Home: EvtFeedScreen,
  IntEvt: IntEvtScreen,
  Profile: ProfileScreen
},
);

const AppNavigator = createStackNavigator({
  Main: EvtStack
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

export default createAppContainer(AppNavigator);
