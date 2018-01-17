import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Login from './components/screen/Login/';


export default class App extends React.Component{
  render(){
    return <View style={styles.container}>
              <Login />
          </View>
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#eee',
  }
})