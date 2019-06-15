import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import HomeScreen from './pages/Home'
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

const TabNavigator = createBottomTabNavigator({
  EvtFeed: HomeScreen,
  SubFeed: SubFeedScreen,
  Leaderboard: ExampleFuncs,
});

const AppNavigator = createStackNavigator({
  TabNav: {
    screen: TabNavigator
  }
});

export default createAppContainer(AppNavigator);