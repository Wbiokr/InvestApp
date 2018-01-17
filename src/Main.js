import React from 'react';

import {View, Text} from 'react-native';

import {TabNavigator,TabBarTop} from 'react-navigation';

import Home from './components/screen/Home';
import Datum from './components/screen/Datum';
import Invest from './components/screen/Invest';
import Logs from './components/screen/Log';

export default TabNavigator(
  {
    Home:{
      screen:Home
    },
    Datum:{
      screen:Datum
    },
    Invest:{
      screen:Invest
    },
    Logs:{
      screen:Logs
    },
  },
  {
    tabBarComponent:TabBarTop,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    lazy:true,
    initialRouteName:'Home',
  }
)