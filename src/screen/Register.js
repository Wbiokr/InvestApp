import React from 'react';

import {
  View,
  TextInput,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';

import {createDrawerNavigator,createStackNavigator} from 'react-navigation'

import colors from '../utils/color';

export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      opc:1,
      bg:colors.gray4,
      name:'',
      pass:'',
      phoneNum:1,
      phoneArr:[]
    }
  }
  render(){
    const PhoneCom=null;
    for(let i=0;i<this.state.phoneNum;i++){
      PhoneCom+=<TouchableNativeFeedback>
                  <View>
                    <TextInput
                      placeholder='请输入绑定手机号'
                      // defaultValue={this.state.phoneArr[i]}
                      placeholderTextColor={colors.gray7}
                      caretHidden={false}
                      keyboardType='numeric'
                      secureTextEntry={true}
                      password={true}
                      selectionColor={colors.blue}
                      maxLength={30}
                      multiline={false}
                      clearButtonMode='while-editing'
                      underlineColorAndroid='transparent'
                      returnKeyLabel='GO'
                      onChangeText={v=>{this._unDatePass(v)}}
                      onSelectionChange={()=>{}}
                      style={styles.input}
                    />
                    <TouchableNativeFeedback>
                      <Text 
                        onPress={this._AddPhone.bind(this)}
                        style={{
                          position:'absolute',
                          right:0,
                          height:'100%',
                          fontSize:20,
                          width:50,
                          textAlign:'center',
                          lineHeight:46,
                          bottom:0,
                          color:colors.blueGreen,
                          // backgroundColor:'#c0c'
                        }}
                      >
                        ADD
                      </Text>
                    </TouchableNativeFeedback>
                  </View>
                </TouchableNativeFeedback>
    }
    return(
      <View style={styles.container}>
        <View 
          style={{
            // flex:1,
            width:'100%',
            paddingLeft:50,
            flexDirection:'row',
            // backgroundColor:'#f00',
          }}
        >
          <Text style={{
            textAlign:'center',
            color:colors.blue,
            fontSize:14,
          }}>请输入注册信息</Text>
        </View>
        <View style={styles.form}>
          <TouchableNativeFeedback>
            <TextInput 
              placeholder='请输入账户'
              placeholderTextColor={colors.gray7}
              caretHidden={false}
              keyboardType='email-address'
              secureTextEntry={false}//设置是否加密
              selectionColor={colors.blue}
              maxLength={15}
              multiline={false}
              clearButtonMode='while-editing'
              underlineColorAndroid='transparent'
              returnKeyLabel='飞起来'
              onChangeText={(v)=>{this._upDateName(v)}}
              onSelectionChange={()=>{}}
              style={styles.input}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <TextInput
              placeholder='请输入密码'
              placeholderTextColor={colors.gray7}
              caretHidden={false}
              keyboardType='numeric'
              secureTextEntry={true}
              password={true}
              selectionColor={colors.blue}
              maxLength={30}
              multiline={false}
              clearButtonMode='while-editing'
              underlineColorAndroid='transparent'
              returnKeyLabel='GO'
              onChangeText={v=>{this._unDatePass(v)}}
              onSelectionChange={()=>{}}
              style={styles.input}
            />
          </TouchableNativeFeedback>
          {
            PhoneCom
          }
          <TouchableOpacity style={styles.btnBox} activeOpacity={this.state.opc} >
            <Text onPress={this._Register} style={[styles.btn,{backgroundColor:this.state.bg}]}>注&nbsp;&nbsp;册</Text>
            <Text onPress={this._Login.bind(this)} style={[styles.btn,styles.btn2]}>去登陆</Text>
          
          </TouchableOpacity>
          
          
        </View>
        
      </View>
    )
  }
  _Login(){
    this.props.navigation.replace('Login')
  }
  _AddPhone(){
    alert(123)
  }
  _upDateName=(name)=>{
    this.setState({name});
    if(String(this.state.pass).length>1&&String(this.state.name).length>1){
      this.setState({opc:0.7,bg:colors.blue})
    }else{
      this.setState({opc:1,bg:colors.gray4})
    }
  }
  _unDatePass=(pass)=>{
    this.setState({pass});
    if(String(this.state.pass).length>1&&String(this.state.name).length>1){
      this.setState({opc:0.7,bg:colors.blue})
    }else{
      this.setState({opc:1,bg:colors.gray4})
    }
  }
  _Register=()=>{
    const name=this.state.name;
    const pass=this.state.pass;

    if(name!=='ccc'){
      ToastAndroid.showWithGravity('姓名错误',ToastAndroid.SHORT,ToastAndroid.CENTER)
      return ;
    }
    if(String(pass)!=='2436'){
      ToastAndroid.showWithGravity('密码错误',ToastAndroid.SHORT,ToastAndroid.CENTER)
      return ;
    }
    console.log(this.props)
    this.props.navigation.navigate('Index')
  }
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    flexDirection:'column',
    // justifyContent:'space-around',
    alignItems:'center',
    paddingTop:50,
    backgroundColor:colors.white
  },
  input:{
    fontSize:16,
    color:colors.blue,
    borderBottomColor:colors.gray4,
    borderBottomWidth:1,
    paddingVertical:2,
    marginTop:18,
    width:260,
  },
  btnBox:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  btn:{
    flex:1,
    // width:'50%',
    backgroundColor:colors.gray4,
    color:colors.white,
    textAlign:'center',
    textAlignVertical:'center',
    height:40,
    fontSize:16,
    letterSpacing:60,
    borderRadius:6,
  },
  btn2:{
    color:colors.blue,
    backgroundColor:'transparent',
    fontSize:13,
    // textAlign:'right',
  },
  form:{
    paddingHorizontal:30,
    // flex:1,
  },
  title:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  myInvest:{
    fontSize:20,
    width:50,
    height:60,
    padding:5,
    borderStyle:'dotted',
    borderWidth:2,
    borderColor:colors.blue,
  },
  image:{
    width:130,
    height:130
  },
  registerBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:10
  },
  registerAction:{
    fontSize:12,
    color:colors.blue    
  },
  registerLabel:{
    fontSize:12,
    color:colors.gray6
  }
})