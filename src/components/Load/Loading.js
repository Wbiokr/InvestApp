import React from 'react';

import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

export default class MyActivityIndicator extends React.Component{
  render(){
    return(
      <View style={styles.indicator}>
        <View style={styles.box}>
          <ActivityIndicator 
            color='#ca6'
            animating={true}
            size='large'
          />
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  indicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  box:{
    padding:15,
    backgroundColor:'rgba(0,0,0,0.4)',
    borderRadius:8,
  }
})