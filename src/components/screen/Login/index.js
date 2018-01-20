import React from 'react';



import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

import CheckBox from 'react-native-checkbox';

import color from '../../../deploy/Color';


export default class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      color:'#f00',
      fz:18,
      height:12,
      width:12,
    }
    this.login=this.login.bind(this)
  }
  render(){
   return(
     <View style={styles.container}>
        <View style={styles.box}>
          <View>
            <Text style={[styles.title,{fontSize:this.state.fz}]}>PERSON INFOR</Text>
            <View style={styles.name}>
              <Text style={[{width:50},styles.height]}>name:</Text>
              <TextInput style={
                  [{flex:1},styles.center,styles.height,styles.input]
                } 
                placeholder='username'
                underlineColorAndroid='transparent' 
                maxLength={10} 
                ref='name'
                onChangeText={(name)=>{
                  this.setState({name})
                }}
              />
            </View>
            <View style={styles.name}>
              <Text style={[{width:50},styles.height]}>pass:</Text>
              <TextInput style={
                  [{flex:1},styles.center,styles.height,styles.input]
                } 
                placeholder='password'
                underlineColorAndroid='transparent'  
                maxLength={12}
                ref='pass'
                onChangeText={(pass)=>{
                  this.setState(pass)
                }}
              />
            </View>
          </View>
          <View style={{paddingVertical:10}}>
              <CheckBox style={{backgroundColor:'#f00'}} 
                  label='Remeber Account'
                  labelBefore={false}
                  labelStyle={{
                    color:color.orange
                  }}
                  containerStyle={{
                  }}
                  checkboxStyle={{
                    // borderColor:color.yellow,
                    height:this.state.height,
                    width:this.state.width,
                  }}
                  // checked={true}
                  underlayColor={color.gray3}
                  onChange={(v)=>{
                    this.togglePassStatus(v)
                  }}
              />
          </View>
          <TouchableOpacity activeOpacity={0.9} style={{marginTop:15}}>
                
            <Button
              disabled={false}
              ref='sbt' 
              title='submit'
              // color={this.state.color}
              onPress={()=>{
                this.login()
              }}
            />
          </TouchableOpacity>
        </View>
     </View>
   )   
  }
  login(v){
    LayoutAnimation.configureNext({
      duration:400,
      create:{
        type:LayoutAnimation.Types.spring,
        property:LayoutAnimation.Properties.scaleXY,
      },
      update:{
        type:LayoutAnimation.Types.spring
      } 
    });

    // this.setState({
    //   width:30,
    //   height:30,
    // })

    if(v){

    }
  }
  togglePassStatus(v){
    const message=!v?'您已忘记账户':'您已记住账户';
    ToastAndroid.show(message,200);
    // localStorage.setItem('invest',JSON.stringify({
    //   login:true,
    //   infor:{
    //     name:this.refs.name
    //   }
    // }))
    const invest=v?JSON.stringify({
      isLogin:true,
      infor:{
        name:this.state.name,
        pass:this.state.pass
      }
    }):JSON.stringify({
      isLogin:false,
      infor:{
        name:'',
        pass:'',
      }
    })
    AsyncStorage.setItem('invest',invest);
    // alert(JSON.stringify(AsyncStorage.getItem()))
    AsyncStorage.getItem('invest').then(v=>{alert(v)})
  }
}

const styles=StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  // label:{

  // },
  height:{
    height:30,
    lineHeight:22,
    fontSize:14,
  },
  input:{
    // borderWidth:1,
    borderColor:color.gray1,
    color:color.blueGreen
  },
  
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // boxShadow:'0 0 0 20 0 rgba(0,0,0,0.5)'
  },
  box:{
    width:'70%',
    backgroundColor:color.gray4,
    padding:20,
    paddingVertical:30,
    borderRadius:6,
    // shadowColor:color.gray3,
    // shadowOffset:{w:2,h:0},
    // shadowOpacity:0.5,
    // elevation:100,
    shadowOffset: {width: 0, height: 5},  
    shadowOpacity: 0.5,  
    shadowRadius: 5,  
    shadowColor: color.gray5,  
    //注意：这一句是可以让安卓拥有灰色阴影  
    elevation: 1000,  
  },
  name:{
    flexDirection:'row',
    borderBottomColor:color.blueGreen,
    borderBottomWidth:1,
    marginVertical:10,
  },
  title:{
    color:color.blueTxt,
    fontSize:18,
    marginBottom:10,
  }
})