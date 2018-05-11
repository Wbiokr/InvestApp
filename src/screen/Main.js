import React from 'react';

import {
  createStackNavigator
} from 'react-navigation'

import {
  View,
  Text
} from 'react-native'

import Login from './Login'
import Register from './Register'
import Index from './Index'


const App = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        // title:'denglu',
        header: null,
      }
    },
    
    Register:{
      screen:Register,
      navigationOptions:{
        header:null,
      }
    },

    Main:{
      screen:Index,
      navigationOptions:{
        header:null
      }
    }
  },
  {
    initialRouteName: 'Login',
    mode: 'modal',
    headerMode: 'screen',

  }
)


const AppScreen = <App
  screenProps={
    {
      a: 123
    }
  }
/>

export default App