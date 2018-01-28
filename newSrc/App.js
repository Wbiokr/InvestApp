import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import Login from './screen/Login';
import Index from './screen/Index';

// AsyncStorage

export default StackNavigator(
  {
    Login:{
      screen:Login,
      // navigationOptions:{
      //   headerTitle:''
      // }
    },
    Index:{
      screen:Index,
      // navigationOptions:{
      //   headerTitle:'主要页面'
      // }
    }
  },
  {
    initialRouteName:'Index',
    initialRouteParams:{
      name:'chen'
    },
    navigationOptions:{

    },
    headerMode:'none',
    mode:'modal',
  }
)