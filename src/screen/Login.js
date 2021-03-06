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

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      opc:1,
      bg:colors.gray4,
      name:'',
      pass:'',
    }
    console.log(this.props)
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.title}>
          <Image style={styles.image} source={require('../img/logo.png')} />
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
              // inlineImageLeft={}//左侧图标
              // inlineImagePadding={{}}//左侧图标padding样式
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
          <TouchableOpacity style={styles.btnBox} activeOpacity={this.state.opc} onPress={this._login}>
            <Text style={[styles.btn,{backgroundColor:this.state.bg}]}>登&nbsp;&nbsp;录</Text>
          </TouchableOpacity>
          <View style={styles.registerBox}>
            <Text style={styles.registerLabel}>还没有账号？</Text>
            <Text style={styles.registerAction} onPress={this._register.bind(this)}>去注册</Text>
          </View>
          
        </View>
        
      </View>
    )
  }
  _register(){
    this.props.navigation.navigate('Register')
  }
  _upDateName=(name)=>{
    this.setState({name});
    console.log(this.state)
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
  _login=()=>{
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
    this.props.navigation.navigate('Main')
  }
}


export default createDrawerNavigator(
  {
    Index:{
      screen:Login,
    }
  },
  {
    initialRoute:'Index'
  }
)

const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    paddingBottom:100,
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