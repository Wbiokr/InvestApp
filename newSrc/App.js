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
// import Pass from './screen/Pass';

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
    },
    // Pass:{
    //   screen:Pass,
    //   navigationOptions:{
    //     header:null
    //   }
    // }
  },
  {
    initialRouteName:'Login',
    initialRouteParams:{
      name:'chen'
    },
    navigationOptions:{

    },
    headerMode:'float',
    mode:'modal',
  }
)