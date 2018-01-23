import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import Login from './screen/Login';
import Index from './screen/Index';

import './deploy/';

export default StackNavigator(
  {
    Login:{
      screen:Login,
      navigationOptions:{
        header:null
      }
    },
    Index:{
      screen:Index,
      navigationOptions:{
        // headerTitle:'hello',
            header:null,
        // headerTintColor:'#666',
        // headerTitleStyle:{
        //   alignSelf:'center'
        // }        
      }
    }
  },
  {
    initialRouteName:'Index',
    mode:'card',
    
  }
)



const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#eee',
  }
})