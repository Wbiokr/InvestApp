import React from 'react';

import {
  View
} from 'react-native'

import {
  TabNavigator,
  TabBarTop,
  TabBarBottom,
} from 'react-navigation';

import Activity from './Activity';
import Announce from './Announce';
import Title from '../../components/Head/Title';

import {yd } from '../../deploy/Color';

export default TabNavigator(
  {
    Activity:{
      screen:Activity,
      navigationOptions:{
        tabBarLabel:'活动'
      }
    },
    Announce:{
      screen:Announce,
      navigationOptions:{
        tabBarLabel:'公告',
      }
    }
  },
  {
    initialRouteName:'Activity',
    mode:'card',
    lazy:true,
    tabBarPosition:'top',
    tabBarComponent:TabBarBottom,
    tabBarOptions:{
      activeTintColor:'#ca6',
      inactiveTintColor:'#333',
      labelStyle:{
        fontSize:16,
        paddingVertical:13,
        // borderBottomColor:'#ca6',
        // borderBottomWidth:2,
      },
      style:{
        height:50,
        borderBottomColor:'#ccc',
        marginTop:50,
        backgroundColor:'#fff',
      }
    }
  }
)

// export default class BoxDis extends React.Component{
//   render(){
//     return <View>
//               <Title title='发现' />
//               <Dis />
//           </View>
//   }
// };