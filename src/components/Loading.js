import React from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import colors from '../utils/color'


export default class Loading extends React.Component{
  render(){
    return(
      <View style={loadStyles.wrapper}>
        <View style={loadStyles.box}>
          <ActivityIndicator 
            animating={true}
            color={colors.white}
            size='large'
          />
          <Text style={loadStyles.txt}>数据加载中...</Text>
        </View>
      </View>
    )
  }
}

const loadStyles=StyleSheet.create({
  wrapper:{
    // flex:1,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    marginTop:-100,
    zIndex:10,

  },
  box:{

    paddingVertical:12,
    paddingHorizontal:20,
    // maxWidth:
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.6)',
    borderRadius:6
  },
  txt:{
    marginLeft:20,
    fontSize:14,
    color:colors.white
  }
})