import React from 'react';

import {
  TabNavigator,
  TabBarBottom, 
  TabBarTop,
} from 'react-navigation'

import Discovery from './Discovery/';
import Home from './Home/';
import Mine  from './Mine/';
import Pro from './Product/';

import {yd} from '../deploy/Color';

import {
  View,
  Text,
  Image
} from 'react-native';

import Title from '../components/Head/Title';

const Dis=()=>(
  <View style={{flex:1}}><Title title='发现' /><View style={{flex:1}}><Discovery /></View></View>
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
        tabBarIcon({tintColor}){
          return <Image 
                  resizeMode='stretch'
                  style={{height:10,width:30,tintColor}}  
                  source={require('../images/active/icon4.png')}
                />}
      }
    },
    Pro:{
      screen:Product,
      navigationOptions:{
        tabBarLabel:'理财',
        tabBarIcon({tintColor}){
          return <Image 
                  resizeMode='stretch'
                  style={{height:10,width:30,tintColor}}  
                  source={require('../images/active/icon4.png')}
                />}
      }
    },
    Discovery:{
      screen:Dis,
      navigationOptions:{
        tabBarLabel:'发现',
        tabBarIcon({tintColor}){
          return <Image 
                  resizeMode='stretch'
                  style={{height:10,width:30,tintColor}}  
                  source={require('../images/active/icon4.png')}
                />}
      }
    },
    Mine:{
      screen:Mine,
      navigationOptions:{
        tabBarLabel:'我的',
        tabBarIcon({tintColor}){
              return <Image 
                      resizeMode='stretch'
                      style={{height:10,width:30,tintColor}}  
                      source={require('../images/active/icon4.png')}
                    />}
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
      showIcon:true,
      showLabel:true,
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