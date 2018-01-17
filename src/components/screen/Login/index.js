import React from 'react';



import {
  View,
  Text,
  Button,
  TextInput,
  CheckBox,
  StyleSheet
} from 'react-native';

import color from '../../../deploy/Color';


export default class Login extends React.Component{
  render(){
   return(
     <View style={styles.container}>
        <View style={styles.box}>
          <View>
            <Text style={styles.title}>PERSON INFOR</Text>
            <View style={styles.name}>
              <Text style={[{width:50},styles.height]}>name:</Text>
              <TextInput style={
                  [{flex:1},styles.center,styles.height,styles.input]
                } 
                placeholder='username'
                underlineColorAndroid='transparent' 
                maxLength={10} 
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
              />
            </View>
          </View>
          <View>
              <CheckBox style={{backgroundColor:'#f00'}} />
          </View>
          <View style={styles.submit}>
                
            <Button 
              title='submit'
              onPress={()=>{}}
              // style={styles.submit}
            />
          </View>
        </View>
     </View>
   )   
  }
}

const styles=StyleSheet.create({
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  height:{
    height:30,
    lineHeight:22,
    fontSize:14,
  },
  input:{
    // borderWidth:1,
    // borderColor:color.gray1,
    color:color.blueGreen
  },
  submit:{
    marginTop:15,
    // color:color.orange
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