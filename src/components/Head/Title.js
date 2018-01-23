import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Title extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {title}=this.props;

    return(
      <TouchableOpacity style={styles.container} activeOpacity={0.8}>
        <Text style={styles.txt}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:40,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    top:0,
    left:0,
    borderBottomColor:'#dedede',
    borderBottomWidth:1,
  },
  txt:{
    fontSize:18,
    color:'#333',
  },

})