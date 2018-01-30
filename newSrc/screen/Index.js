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
// import History from './History/';
// import Now from './Now/';
import Wallet from './Wallet/';

import colors from '../utils/color';

const Left=()=>{
  return(
    <View >
      <Text style={styles.arrow}>Left</Text>
    </View>
  )
}
const Right=()=>(
  <View >
    <Text style={styles.arrow}>Right</Text>
  </View>
)

const Title=({title})=>(
  <View style={{alignSelf:'center'}}>
    <Text style={[styles.arrow,{fontSize:16}]}>{title}</Text>
  </View>
)

export default TabNavigator(
  {
    Home:{
      screen:Home,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
            <Image resizeMode='contain' source={require('../img/icon/home.png')} style={[styles.icon,{tintColor:tintColor}]} />
        ),
        headerTitle:<Title title='投资' />,
        
      }
    },
    // History:{
    //   screen:History,
    //   navigationOptions:{
    //     tabBarLabel:'History',
    //     tabBarIcon:({tintColor})=>(
    //       <Image resizeMode='contain' source={require('../img/icon/history.png')} style={[styles.icon,{tintColor}]} />
    //     ),
    //     header:null,
    //   }
    // },
    // Now:{
    //   screen:Now,
    //   navigationOptions:{
    //     tabBarLabel:'Now',
    //     tabBarIcon:({tintColor})=>(
    //       <Image resizeMode='contain' source={require('../img/icon/now.png')} style={[styles.icon,{tintColor}]} />
    //    ),
    //    header:null,
    //   }
    // },
    Wallet:{
      screen:Wallet,
      navigationOptions:{
        tabBarLabel:'Wallet',
        tabBarIcon:({tintColor})=>(
          <Image resizeMode='contain' source={require('../img/icon/wallet.png')} style={[styles.icon,{tintColor}]} />
        ),
        headerTitle:<Title title='钱包' />
      }
    }
  },
  {
    initialRouteName:'Wallet',
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