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

// import {
//   Button
// } from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors  from '../../utils/color';

export default class Add extends React.Component{
  constructor(props){
    super(props)
    this.state={
      opc:1,
      bg:colors.gray4,
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
          label:'标的时间',
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
              style={{borderBottomColor:colors.gray4,borderBottomWidth:1}}
              labelStyle={{color:colors.gray7}}
              iconClass={FontAwesome}
              iconName={item.iconName}
              iconColor={colors.greens}
              iconSize={20}
              autoFocus={item.key===this.state.key}
              ref={item.key}
              onChangeText={(v)=>{
                alert(v)
                this.setState({
                  [item.key]:v
                })
              }}
            />
          ))
        }
        <TouchableOpacity style={styles.btnBox} activeOpacity={this.state.opc} onPress={this.addMao}>
          <Text style={[styles.btn,{backgroundColor:this.state.bg}]}>录入平台</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
  addMao=()=>{
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
    const rateAll=this.state.rateAll||'';
    const rateHas=this.state.rateHas||'';
    const startTime=this.state.startTime||'';
    const endTime=this.setState.endTime||'';
    const phone=this.state.phone||'';
    const card=this.state.card||'';
    const infor={name,cash,rateAll,rateHas,startTime,endTime,phone,card}
    console.log(infor)
    alert(JSON.stringify(infor))
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