import React from 'react';

import {Text, View} from 'react-native';

export default class Datum extends React.Component{
  static navigationOptions={
    title:'日記'
  }
  render(){
    return <View>
              <Text>这里是Note页面</Text>
          </View>
  }
} 