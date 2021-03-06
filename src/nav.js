/*
  nav.js handles all navigation between pages
*/

import React from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import EvtFeedScreen from './pages/EvtFeed'
import ExampleFuncs from './pages/ExampleFuncs'
import IntEvtScreen from './pages/IntEvt'
import ProfileScreen from './pages/Profile'
import MyProfileScreen from './pages/MyProfile'
import NewEvtPg from './pages/NewEvt'
import NewSubScreen from './pages/NewSub'
import PickCatPg from './pages/PickCat'

// EvtStack is the Second-Layer navigator for the app
const EvtStack = createStackNavigator({
  Home: EvtFeedScreen,
  IntEvt: IntEvtScreen,
  Profile: ProfileScreen
}
);


// AppNavigator is the Top-Layer navigator for the entire app
const AppNavigator = createStackNavigator({
  Main: EvtStack,
  NewEvt: NewEvtPg,
  PickCats: PickCatPg,
  MyProfile: MyProfileScreen,
  NewSub: NewSubScreen
},
{
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    headerVisible: false,
  }
}
);

export default createAppContainer(AppNavigator);
