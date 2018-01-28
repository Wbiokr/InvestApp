import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';

import Home from './Home/';
import History from './History/';
import Now from './Now/';
import Wallet from './Wallet/';

import colors from '../utils/color';

export default TabNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:{
        title:'yem',
        tabBarIcon:({tintColor})=>(
            <Image resizeMode='contain' source={require('../img/icon/home.png')} style={[styles.icon,{tintColor:tintColor}]} />
        ),
        headerTitle:'首页'
      }
    },
    History:{
      screen:History,
      navigationOptions:{
        tabBarLabel:'History',
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/history.png')} style={[styles.icon,{tintColor}]} />
      )
      }
    },
    Now:{
      screen:Now,
      navigationOptions:{
        tabBarLabel:'Now',
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/now.png')} style={[styles.icon,{tintColor}]} />
       )
      }
    },
    Wallet:{
      screen:Wallet,
      navigationOptions:{
        tabBarLabel:'Wallet',
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/wallet.png')} style={[styles.icon,{tintColor}]} />
        )
      }
    }
  },
  {
    initialRouteName:'Home',
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    navigationOptions:{
      title:'发现',
      headerTitle:'你好'
    },
    tabBarOptions:{
      style:{
        backgroundColor:colors.white,
        height:45
      },
      tabStyle:{
        paddingTop:3,
        // flex:1,
        // justifyContent:'between',
      },
      labelStyle:{
        fontSize:12,
      },
      iconStyle:{

      },
      activeTintColor:colors.blue,
      inactiveTintColor:colors.gray4,
      showIcon:true,
      pressColor:'#ca6',
      pressOpacity:0.6,
    }
  }
);

const styles=StyleSheet.create({
  icon:{
    height:23
  }
})