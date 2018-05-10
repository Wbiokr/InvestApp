import React from 'react';

import {
  createStackNavigator
} from 'react-navigation'

import {
  View,
  Text
} from 'react-native'

import Home from './Home/';
import Add from './Add/';
import Login from './Login'
import Register from './Register'
console.log(123)



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

    Add: {
      screen: Add,
      navigationOptions: {
        // title:'tianjia',
        header: () => (
          <View style={{ backgroundColor: '#ccc' }}>
            <Text style={{ color: '#f00' }}>增加页</Text>
          </View>
        ),
        // headerTitle:'add page',
        headerBackTisstle: 'BACK',
        gesturesEnabled: true,
        gestureDirection: 'default',
        headerForceInset: true,
        headerPressColorAndroid: '#ff0'
        // headerRight:()=>(
        //   <View style={{backgroundColor:'#ff0'}}>
        //     <Text>right</Text>
        //   </View>
        // )
      }
    }
  },
  {
    initialRouteName: 'Register',
    mode: 'modal',
    headerMode: 'screen',
    // headerTransitionPreset:'fade-in-place',

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