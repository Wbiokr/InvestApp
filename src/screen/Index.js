import React from 'react';

import {
  TabNavigator,
  TabBarBottom, 
} from 'react-navigation'

import Discovery from './Discovery/';
import Home from './Home/';
import Mine  from './Mine/';
import Pro from './Product/';

import {yd} from '../deploy/Color';

import {
  View,
  Text,
} from 'react-native';

import Title from '../components/Head/Title';

const Dis=()=>(
  <View><Title title='发现' /><Discovery /></View>
)

const Product=()=>(
  <View><Title title='理财' /><Pro /></View>
)

export default TabNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:{
        tabBarLabel:'首页',
      }
    },
    Pro:{
      screen:Product,
      navigationOptions:{
        tabBarLabel:'理财'
      }
    },
    Discovery:{
      screen:Dis,
      navigationOptions:{
        tabBarLabel:'发现',
      }
    },
    Mine:{
      screen:Mine,
      navigationOptions:{
        tabBarLabel:'我的',
        indicatorStyle:{
          height:0,
        }
      }
    },
  },
  {
    initialRouteName:'Discovery',
    lazy:true,
    tabBarPosition:'bottom',
    tabBarComponent:TabBarBottom,
    swipeEnabled:false,
    animationEnabled:false,
    tabBarOptions:{
      activeTintColor:'#ca6',
      inactiveTintColor:'#666',
      labelStyle:{
        // color:'red'
        fontSize:14,
        lineHeight:50,
        // marginTop:-20,
      },
      tabStyle:{
        // height:20,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'red'
        // lineHeight:50,
      },
      style:{
        justifyContent:'center',
        alignItems:'center',
        height:48,
        borderTopColor:'#ccc',
        backgroundColor:'#fff'
      }
    }
  }
)