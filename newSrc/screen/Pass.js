import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  // Dimensions/
} from 'react-native';

import Password from 'react-native-gesture-password';

import colors from '../utils/color';

let passwrod1='';

export default class MyPass extends React.Component{
  constructor(props){
    super(props);

    this.state={
      msg:'请绘制手势密码',
      status:'normal',
    }
  }
  render(){
    return(
      <Password 
      
        ref='ps'
        status={this.state.status}
        message={this.state.msg}
        onStart={this._start}
        onEnd={this._end}
        innerCircle={true}
        outerCircle={true}
        textStyle={{fontSize:16}}
        style={{height:100}}
        normalColor={colors.blue}
        wrongColor={colors.red}
        rightColor={colors.green}
      />
    )
  }
  _start=()=>{
    if(passwrod1===''){
      this.setState({
        msg:'请绘制手势密码！'
      })
    }else{
      this.setState({
        msg:'请再次输入密码！'
      })
    }
  }
  _end=(pass)=>{
    if(passwrod1===''){
      passwrod1=pass;
      this.setState({
        status:'normal',
        msg:'请再次输入密码！',
      })
    }else{
      if(passwrod1===pass){
        this.setState({
          status:'right',
          msg:'成功设置密码！'
        })
        passwrod1=''
      }else{
        this.setState({
          status:'wrong',
          msg:'两次密码不一致，请重试！'
        })
      }
    }
  }
}