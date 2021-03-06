import React from 'react';

// import {
//   Provider,
//   connect
// } from 'react-redux'

// import store from '../redux/index'

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';

import {
  TabNavigator,
  createBottomTabNavigator,
  TabBarBottom,
  addNavigationHelpers
} from 'react-navigation';

import Home from './Home/';
import Wallet from './Wallet/';
import Add from './Add/';

import colors from '../utils/color';

import Icon from 'react-native-vector-icons/FontAwesome';

const Left=()=>{
  return(
    <View >
      <Text style={styles.arrow}><Icon name='th-large' /></Text>
    </View>
  )
}
const Right=()=>(
  <View >
    <Text style={styles.arrow}><Icon name='search' /></Text>
  </View>
)

const Title=({title})=>(
  <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} style={{alignSelf:'center'}}>
    <Text style={[styles.arrow,{fontSize:12}]}>{title}</Text>
  </TouchableNativeFeedback>
)

export default TabNavigator(
  {
    Home:{
      screen:Home,
      path:'/index/home',
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/home.png')} style={[styles.icon,{tintColor:tintColor}]} />
        ),
        headerTitle:<Title title='在投羊毛' />,
        
      }
    },
    Add:{
      screen:Add,
      path:'/index/add',
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/history.png')} style={[styles.icon,{tintColor}]} />
        ),
        headerTitle:<Title title='添加羊毛' />
      },
     
    },
    Wallet:{
      screen:Wallet,
      path:'/index/wallet',
      navigationOptions:{
        tabBarLabel:'Wallet',
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/wallet.png')} style={[styles.icon,{tintColor}]} />
        ),
        headerTitle:<Title title='我的钱包' />
      }
    }
  },
  {
    initialRouteName:'Home',
    tabBarComponent:TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    // navigationOptions:{
    //   title:'发现',
    //   headerTitle:'你好'
    // },
    navigationOptions:{
      headerBackTitle:null,
      headerLeft:<Left />,
      headerRight:<Right />,
      headerStyle:{
        backgroundColor:colors.blue,
        justifyContent:'center',
        paddingHorizontal:10,
        height:34,
      },
      headerTitleStyle:{
        alignSelf:'center',
        color:colors.white,
        fontSize:14,
        fontWeight:'500',
      }
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
  },
  arrow:{
    fontSize:12,
    color:colors.white,
  }
})