import { AppRegistry,Platform,UIManager } from 'react-native';


import App from './newSrc/App';


if(Platform.OS.toLowerCase()==='android'){
  UIManager.setLayoutAnimationEnabledExperimental(true)  
}

AppRegistry.registerComponent('myapp', () => App);
// AppRegistry