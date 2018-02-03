import React from 'react';

import PropTypes, { string, number } from 'prop-types';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import colors from '../utils/color';

export default class Show extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {isShow,x,y,reload,edit,remove,cancel}=this.props;
    if(!isShow){
      return null;
    }
    return(
      <TouchableWithoutFeedback onPress={cancel} >
        <View style={[styles.wrapper,{height:Dimensions.get('window').height,width:Dimensions.get('window').width}]}>
        <View style={[{position:'absolute'},{top:this.convertY.bind(this)(y,150),left:this.convertX.bind(this)(x,40)},styles.box,styles.container]}>
          <TouchableHighlight style={[styles.item]} underlayColor={colors.gray4} onPress={edit} >
            <Text style={styles.txt}>编辑</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.item]} underlayColor={colors.gray4} onPress={remove}>
            <Text style={styles.txt}>删除</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.item]} underlayColor={colors.gray4} onPress={reload}>
            <Text style={styles.txt}>刷新</Text>
          </TouchableHighlight>
        </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  convertX(x,disX){
    const w=Dimensions.get('window').width;
    if(Number(x)+Number(disX)>=w-40){
      return Number(w)-Number(disX)-40
    }
    return x; 
  }
  convertY(y,disY){
    const h=Dimensions.get('window').height;
    if(Number(y)+Number(disY)>h-200){
      return Number(h)-Number(disY)-100
    }
    return y-50;
  }

}

Show.propTypes={
  isShow:PropTypes.bool.isRequired,
  x:PropTypes.oneOfType([
    PropTypes.string,PropTypes.number
  ]),
  y:PropTypes.oneOfType([
    PropTypes.string,PropTypes.number
  ]),
  reload:PropTypes.func.isRequired,
  edit:PropTypes.func.isRequired,
  remove:PropTypes.func.isRequired,
  cancel:PropTypes.func.isRequired,
}

const styles=StyleSheet.create({
  wrapper:{
    flex:1,
    position:'absolute',
    top:0,
    left:0,
    zIndex:1000,
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  container:{
    // backgroundColor:'rgba(0,0,0,0.3)',
    backgroundColor:colors.white,
    // borderRadius:8,
    overflow:'hidden',
  },
  box:{
    height:150,
    width:60,
    justifyContent:'center',
    alignItems:'center',
  },
  item:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  txt:{
    fontSize:16,
    color:colors.gray5,
  },
})
