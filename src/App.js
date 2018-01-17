import React from 'react';

import { Text, Easing } from 'react-native';

import { TabNavigator, DrawerNavigator, StackNavigator,TabBarBottom,StackRouter } from 'react-navigation'

import Home from './components/views/Home';
import Datum from './components/views/Datum';
import Login from './components/views/Login';
import Invest from './components/views/Invest';

// export default class App extends React.Component{
//   render(){
//     return <Text>hello world</Text>
//   }
// }

// export default StackNavigator({
//   Home:{
//     screen:Home
//   },
//   Login:{
//     screen:Login,
//     title:'現在來到登錄'
//   },
//   Datum:{
//     screen:Datum,
//   }
// })
// drawerNavigator导航
// export default DrawerNavigator(
//   // routeConfig 就是遍历所有加入导航的组件
//   { 
//     Home:{
//       screen:Home
//     },
//     Login:{
//       screen:Login,
//     },
//     Invest:{
//       screen:Invest,
//     }

//   },
//   // drawer配置
//   {
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//     initialRouteName: 'Login',
//     contentOptions: {
//       activeTintColor: '#e91e63',
//     },
//   }
// )


// export default TabNavigator(
//   // routeConfig
//   {
//     Home:{
//       screen:Home,
//       tabBarComponent:'TabBarBottom',
//     },
//     // Datum:{
//     //   screen:Datum,

//     // }
//     Login:{
//       screen:Login,
//     },
//     Invest:{
//       screen:Invest
//     }

//   },

//   // navigationConfig
//   {
//     tabBarPosition:'bottom',//tab导航的位置 android默认位置top 
//     tabBarComponent:TabBarBottom,//导航条的组件，android默认为tabBarTop，ios默认为tabBarBottom
//     swipeEnabled:false,//是否支持滑动切换组件
//     animationEnabled:false,//是否使用动画切换导航视图
//     // configTransiton:{}, //配置切换组件的过渡动画
//     lazy:false,//是否懒加载组件
//     initialLayout:{
//       width:200,
//       height:400,
//     },//配置默认layout
//     // order:,//路由顺序
//     initialRouteName:'Login',
//     tabBarOptions:{//设置导航条组件（tabBarBottom与tabBarTop配置有所不同）
//       activeTintColor:'#f00',//当前组件时候tab颜色
//       activeBackgroundColor:'yellow',//当前组件tab背景色
//       inactiveTintColor:'green',//其他组件tab颜色
//       inactiveBackgroundColor:'#333',//其他组件tab背景色
//       showLabel:true,//是否显示label，默认为true
//       style:{//导航条样式
//         // backgroundColor:'#333',
//       },
//       labelStyle:{//路由标记（字体与icon）样式
//         // color: 'green',
//         fontSize:28
        
//       }
//     }
//   }
// )

// export default StackNavigator(
//   {
//     Index: {
//       screen: TabNavigator({
//         Home: {
//           screen: Home,
//         },
//         Login: {
//           screen: Login,
//         }
//       })
//     },
//     Datum: {
//       screen: Datum,
//       path: '/datum/:name',
//     }
//   },
//   {
//     initialRouteName:'Datum',//这是默认路由
//     initialRouteParams:{
//       name:'初始化'
//     },//默认路由的默人param参数
//     navigationOptions:{
//       title:'默认题目'
//     },//给所有路由页面的默人options设置


//     mode:'modal',
//     headerMode:'screen',//路由 页面header部分 模式：float、screen、none
//     // transitionConfig:()=>(
//     //   {
//     //     transitionSpec:{
//     //       duration:500,
//     //       ease:Easing.out(Easing.poly(4)),
//     //       timing:Animated.timing,
//     //     },
//     //     screenInterpolator:sceneProps=>{
//     //       const {layout,position,scene}=sceneProps;
//     //       const {index}=scene;
//     //       const height=layout.initHeight;
//     //       const translateY=position.interpolate({
//     //         inputRange:[index-1,index,index+1],
//     //         outputRange:[height,0,0],

            
//     //       });
//     //       const opacity=position.interpolate({
//     //         inputRange:[index-1,index-0.99,index],
//     //         outputRange:[0,1,1]
//     //       });

//     //       return {
//     //         opacity,transform:[{translateY}]
//     //       }
//     //     }
//     //   }
//     // )
//   }
// )