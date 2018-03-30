import { AppRegistry,Platform,UIManager } from 'react-native';


import App from './src/App';


if(Platform.OS.toLowerCase()==='android'){
  UIManager.setLayoutAnimationEnabledExperimental(true)  
}

AppRegistry.registerComponent('myapp', () => App);
// AppRegistry