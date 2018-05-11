import React from 'react';

import {
  View,
  TextInput,
  ScrollView,
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
      phoneArr:['']
    }
  }
  render(){
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <View 
          style={{
            width:'100%',
            paddingLeft:50,
            flexDirection:'row',
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
            this.state.phoneArr.map((item,index)=>(
              <TouchableNativeFeedback key={index}>
                  <View>
                    <TextInput
                      ref={ `phone_${index}`}
                      autoFocus={item.focus}
                      placeholder='请输入手机号'
                      placeholderTextColor={colors.gray7}
                      caretHidden={false}
                      keyboardType='email-address'
                      secureTextEntry={false}//设置是否加密
                      selectionColor={colors.blue}
                      maxLength={11}
                      keyboardType='numeric'
                      multiline={false}
                      clearButtonMode='while-editing'
                      underlineColorAndroid='transparent'
                      returnKeyLabel='飞起来'
                      onChangeText={(v)=>{this._upDatePhone(v,index)}}
                      onSelectionChange={()=>{}}
                      style={styles.input}
                    />
                    <TouchableNativeFeedback>
                      <Text 
                        onPress={this._AddPhone.bind(this,index)}
                        style={{
                          position:'absolute',
                          right:0,
                          height:'100%',
                          fontSize:20,
                          width:50,
                          textAlign:'center',
                          lineHeight:46,
                          bottom:0,
                          color:index<this.state.phoneArr.length-1?colors.orange:colors.blueGreen,
                        }}
                      >
                        {
                          index<this.state.phoneArr.length-1?'DEL':'ADD'
                        }
                      </Text>
                    </TouchableNativeFeedback>
                  </View>
                </TouchableNativeFeedback>
            ))
          }
          <TouchableOpacity style={styles.btnBox} activeOpacity={this.state.opc} >
            <Text onPress={this._Register} style={[styles.btn,{backgroundColor:this.state.bg}]}>注&nbsp;&nbsp;册</Text>
            <Text onPress={this._Login.bind(this)} style={[styles.btn,styles.btn2]}>去登陆</Text>
          
          </TouchableOpacity>
          
          
        </View>
        
      </ScrollView>
    )
  }
  _Login(){
    this.props.navigation.goBack()
  }
  _AddPhone(index){
    
    let oldArr=this.state.phoneArr;
    
    let newArr=oldArr.concat(['']);
    if(index<this.state.phoneArr.length-1){
      oldArr.splice(index,1)
      newArr=oldArr
    }else{
      if(this.state.phoneArr.length>=5){
        ToastAndroid.showWithGravity('手机号限制5个',ToastAndroid.SHORT,ToastAndroid.CENTER)
        return false ;
      }
    }
    this.setState({
      phoneArr:newArr
    })
  }
  _upDatePhone(v,i){
    // console.log(v,i)
    let phoneArr=this.state.phoneArr;
    phoneArr.splice(i,1,v)
    this.setState({
      phoneArr
    })
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
    const name=this.state.name.trim();
    const pass=this.state.pass.trim();

    if(name==''){
      ToastAndroid.showWithGravity('请输入有效账户名！',ToastAndroid.SHORT,ToastAndroid.CENTER)
      return ;
    }
    if(pass==''){
      ToastAndroid.showWithGravity('请输入有效密码！',ToastAndroid.SHORT,ToastAndroid.CENTER)
      return ;
    }
    
    new Promise((resolve,reject)=>{

      Array.from(this.state.phoneArr,(item,index)=>{
        if(String(item).length<11){
          ToastAndroid.show(`第${index}个手机号格式错误，请正确输入!`,ToastAndroid.SHORT)
          // this.$refs['phone_'+index].focus()
          reject()
          return false;
        }

      })

      resolve()

    }).then(()=>{
      this.props.navigation.navigate('Index')
      // fetch()
    }).catch(()=>{
      ToastAndroid.show('参数错误!')
    })

  }
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    flexDirection:'column',
    // justifyContent:'space-around',
    alignItems:'center',
    paddingTop:20,
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