import React from 'react';

import {
  View,Image,Text,StyleSheet,TouchableOpacity
} from 'react-native';

import Activity from './Activity';
import Announce from './Announce';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      type:'left'
    }
  }
  render(){
    const Content=this.state.type==='left'?<Activity />:<Announce />;
    return(
      <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',borderBottomWidth:1,borderBottomColor:'#fefefe'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity style={{flex:1,alignSelf:'center',alignItems:'center'}} activeOpacity={0.8} onPress={()=>{
              this.setState({
                type:'left'
              })
            }}>
              <Text style={{paddingTop:12,textAlign:'center',fontSize:16}}>平台活动</Text>
              <Image source={require('../../images/bar.png') }  style={{marginTop:10,opacity:this.state.type==='left'?1:0}} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1,alignSelf:'center',alignItems:'center'}} activeOpacity={0.8} onPress={()=>{
              this.setState({
                type:'right'
              })
            }}>
              <Text style={{paddingTop:12,textAlign:'center',fontSize:16}}>官方公告</Text>
              <Image source={require('../../images/bar.png') }  style={{marginTop:10,opacity:this.state.type==='right'?1:0}} />
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            {Content}
          </View>
      </View>
    )
  }
}