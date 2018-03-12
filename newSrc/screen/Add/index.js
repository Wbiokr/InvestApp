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
          this.state.list.map((item,index)=>(
            <TextInput 
              placeholder={`请输入${item.label}` }
              key={index}
              value={item.value||''}
              onChangeText={value=>{
                const item=Object.assign({},item,{value})
                let list=this.state.list;
                list[index]=item;
                this.setState({list})
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
              // ref='btn'
              title='提交'
              raised
              backgroundColor={colors.blue}
              containerViewStyle={{marginVertical:10,marginBottom:40}}
              icon={{name: 'check'}}
              onPress={this.addMao}
            />
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
    let data={}
    for(let i=0;i<this.state.list.length;i++){
      if(this.state.list[i].value==''||this.state.list[i].value==undefined){
        ToastAndroid.show(`请输入${this.state.list[i]['label']}`,ToastAndroid.SHORT)
        return ;
      }
      console.log(i)
      data[this.state.list[i]['key']]=this.state.list[i]['value']
    }
    console.log(data)
    const body=format(data)


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