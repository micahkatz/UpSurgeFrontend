import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import EvtFeedScreen from './pages/EvtFeed'
import ExampleFuncs from './pages/ExampleFuncs'


class SubFeedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SubFeed!</Text>
      </View>
    );
  }
}
class LbScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Leaderboard!</Text>
      </View>
    );
  }
}
const EvtStack = createStackNavigator({
  Home: EvtFeedScreen,
  EvtSub: SubFeedScreen
});

const MainTabs = createBottomTabNavigator({
  EvtFeed: EvtStack,
  SubFeed: SubFeedScreen,
  Leaderboard: ExampleFuncs,
});

const AppNavigator = createStackNavigator({
  TabNav: MainTabs
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

export default createAppContainer(AppNavigator);
