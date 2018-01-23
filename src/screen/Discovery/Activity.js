import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

import {
  TabNavigator
} from 'react-navigation'

import formatData from '../../deploy/formData';

import Title from '../../components/Head/Title';


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      // activitys:
    }
    this.getData=this.getData.bind(this);
  }
  render(){
    return(
      <View>
        <Title title='发现' />  
        <Text> HELOO WORDL </Text>
        <FlatList 

        />
      </View>

    )
  }
  componentDidMount(){
    // alert(JSON.stringify(global.config))
    this.getData()
  }
  getData(){
    fetch(global.config.url.activity,{
      method:'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:formatData({
        page:1,
        versionName:'1.3.1'
      })
      
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      // alert(JSON.stringify(res))
      if(Number(res.code)===0){
        this.setState({
          activity:res.result
        })
      }
    })
  }
}