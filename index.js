import { AppRegistry,Platform,UIManager } from 'react-native';
import React from 'react';
// import {Provider} from 'react-redux';
// import store from './src/redux/index';

import App from './src/screen/Index';

// class AppRedux extends React.Component{
//   render(){
//     return(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//   }
// }

if(Platform.OS.toLowerCase()==='android'){
  UIManager.setLayoutAnimationEnabledExperimental(true)  
}

AppRegistry.registerComponent('myapp', () => App);
// AppRegistry