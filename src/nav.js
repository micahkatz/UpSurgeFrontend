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
import NewEvtPg from './pages/NewEvt'
import {
  createFluidNavigator,
  Transition
} from 'react-navigation-fluid-transitions';

// EvtStack is the Second-Layer navigator for the app
const EvtStack = createFluidNavigator({
  Home: EvtFeedScreen,
  IntEvt: IntEvtScreen,
  Profile: ProfileScreen
},
);


// AppNavigator is the Top-Layer navigator for the entire app
const AppNavigator = createStackNavigator({
  Main: EvtStack,
  NewEvt: NewEvtPg
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
}
);

export default createAppContainer(AppNavigator);
