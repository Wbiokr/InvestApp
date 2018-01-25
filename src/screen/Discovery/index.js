import React from 'react';

import {
  View, Image, StyleSheet
} from 'react-native'

import {
  TabNavigator,
  TabBarBottom,
} from 'react-navigation';



import Activity from './Activity';
import Announce from './Announce';

export default TabNavigator(
  {
    Activity: {
      screen: Activity,
      navigationOptions: {
        tabBarLabel: '平台活动',
      }
    },
    Announce: {
      screen: Announce,
      navigationOptions: {
        tabBarLabel: '官方公告',
      }
    }
  },
  {
    initialRouteName: 'Activity',
    mode: 'card',
    lazy: true,
    tabBarPosition: 'top',
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      activeTintColor: '#ca6',
      inactiveTintColor: '#333',
      labelStyle: {
        fontSize: 16,
        paddingVertical: 10,
       
      },
      style: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
        borderTopWidth: 0,
      }
    }
  }
)


const styles = StyleSheet.create({
  bar: {
    width: 30,
    height: 20,
  }
})
