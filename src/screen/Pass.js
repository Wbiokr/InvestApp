import React from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Password from 'react-native-gesture-password';

let passwrod1='';

class MyPass extends React.Component{
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
        msg={this.state.msg}
        onStart={this._start}
        onEnd={this._end}
        innerCircle={true}
        outerCircle={true}
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