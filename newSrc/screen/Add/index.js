import React from 'react';

import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  ToastAndroid
} from 'react-native';

import {
  Fumi
} from 'react-native-textinput-effects';

import {
  Icon
} from 'react-native-vector-icons';

import {
  Button
} from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors  from '../../utils/color';

import url from '../../utils/api'

import format  from '../../utils/format'

export default class Add extends React.Component{
  constructor(props){
    super(props)
    this.state={
      loading:false,
      // opc:1,
      // bg:colors.gray4,
      key:'',
      list:[
        {
          label:'平台名称',
          iconName:'bus',
          key:'name'
        },
        {
          label:'羊毛金额',
          iconName:'rmb',
          key:'cash',
        },
        {
          label:'总撸数额',
          iconName:'rupee',
          key:'rateAll',
        },
        {
          label:'已返红包',
          iconName:'inr',
          key:'rateHas'
        },
        {
          label:'开始时间',
          iconName:'hourglass-start',
          key:'startTime',
        },
        {
          label:'标的周期',
          iconName:'hourglass-end',
          key:'endTime'
        },
        {
          label:'手机尾号',
          iconName:'phone',
          key:'phone',
        },
        {
          label:'身份证号',
          iconName:'drivers-license-o',
          key:'card'
        }
      ]
    }
  }
  render(){
    return(
      <ScrollView >
        {
          this.state.list.map((item,i)=>(
            <Fumi 
              key={i}
              label={item.label}
              style={{borderBottomColor:colors.gray1,borderBottomWidth:1,transform:[{scaleY:0.8}],marginTop:-8,backgroundColor:colors.white}}
              labelStyle={{color:colors.gray7,fontSize:12,margin:0,padding:0}}
              inputStyle={{color:colors.blue}}
              iconClass={FontAwesome}
              iconName={item.iconName}
              iconColor={colors.orange}
              iconSize={14}
              autoFocus={item.key===this.state.key}
              ref={item.key}
              onChangeText={(v)=>{
                this.setState({
                  [item.key]:v
                })
              }}
            />
          ))
        }
        {
          this.state.loading?<Button
              ref='btn2'
              title='提交中...'
              raised
              loading
              backgroundColor={colors.blue}
            />:
            <Button
              ref='btn'
              title='提交'
              raised
              backgroundColor={colors.blue}
              containerViewStyle={{marginVertical:10,marginBottom:40}}
              icon={{name: 'check'}}
              onPress={this.addMao}
            />
        }
        {
          // <TouchableOpacity style={styles.btnBox} activeOpacity={this.state.opc} onPress={this.addMao}>
          //   <Text style={[styles.btn,{backgroundColor:this.state.bg}]}>录入平台</Text>
          // </TouchableOpacity>
        }
      </ScrollView>
    )
  }
  componentDidMount(){
    console.log(121212121)
    setTimeout(()=>{
    },1000)
  }
  addMao=()=>{
    console.log(this.refs)
    // alert(JSON.stringify(this.state))
    // console.log(33333333333333333)
    const name=this.state.name||'';
    if(!name){
      ToastAndroid.show('请输入平台！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'name'
      })
      return ;
    }
    const cash=this.state.cash||'';
    if(!cash){
      ToastAndroid.show('请输入羊毛金额！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'cash'
      })
      return ;
    }
    const rateAll=this.state.rateAll||'';
    if(!rateAll){
      ToastAndroid.show('请输入总撸金额！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'rateAll'
      })
      return ;
    }
    const rateHas=this.state.rateHas||'';
    if(!rateHas){
      ToastAndroid.show('请输入已得返利！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'rateHas'
      })
      return ;
    }
    const startTime=this.state.startTime||'';
    if(!startTime){
      ToastAndroid.show('请输入标的开始时间！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'startTime'
      })
      // return ;
    }
    const endTime=this.state.endTime||'';
    if(!endTime){
      ToastAndroid.show('请输入标的周期！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'endTime'
      })
      // return ;
    }
    const phone=this.state.phone||'';
    if(!phone){
      ToastAndroid.show('请输入购买手机尾号！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'phone'
      })
      // return ;
    }
    const card=this.state.card||'';
    if(!card){
      ToastAndroid.show('请输入购买身份证尾号！',ToastAndroid.SHORT)
      // this.refs.name.
      this.setState({
        key:'card'
      })
      // return ;
    }
    const body=format({name,cash,rateAll,rateHas,startTime,endTime,phone,card})


    fetch(url.insert,{
      method:'POST',
      headers:{
        "Content-Type":'application/x-www-form-urlencoded',
      },
      body,
    }).then(res=>res.json())
      .then(res=>{
        this.setState({loading:false})
        const status=Number(res.code);
        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        if(status===0){
          // 信息为空
          // ToastAndroid.show(res.msg,ToastAndroid)
        }else if(status===-1){
          // 失败

        }
      })
  }
}

const styles=StyleSheet.create({
  btnBox:{
    marginVertical:20,
    marginHorizontal:10,
  },
  btn:{
    // flex:1,
    width:'100%',
    backgroundColor:colors.gray4,
    color:colors.white,
    textAlign:'center',
    textAlignVertical:'center',
    height:40,
    fontSize:16,
    letterSpacing:60,
    borderRadius:6,
    
  },
})