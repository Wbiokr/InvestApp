import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  AppState,
  BackHandler,
  Platform,
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {PullView} from 'react-native-pull';

import colors from '../../utils/color';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cash:[
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
        {name:'fds',num:2323,unit:'元'},
      ],
      currentState:AppState.currentState,
      startTime:0
    }
  }
  render(){
    return(
      <LinearGradient 
          colors={[colors.gray1,colors.white]}
          style={{flex:1}}
        >
        <View style={styles.HeaderBox}>
          <Text style={styles.HeaderTil}>总在投金额</Text>
          <Text style={styles.HeaderCnt}>10000<Text>元</Text></Text>
        </View>  

        <FlatList 
          contentContainerStyle={styles.content}
          horizontal={false}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
          showsVerticalScrollIndicator={true}
          pagingEnabled={true}
          scrollEnabled={true}
          data={this.state.cash}
          renderItem={this._renderItem}
          keyExtractor={(item,index)=>index}
          ItemSeparatorComponent={this._renderSep}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderHeader}
        />
      </LinearGradient>
    )
  }
  componentDidMount(){
    AppState.addEventListener('change',this._handleChange)
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.addEventListener('hardwareBackPress',this._backHandle)
    }
  }
  componentWillUnmount(){
    AppState.removeEventListener('change');
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.removeEventListener('hardwareBackPress',this._backHandle)
    }
  }

  _backHandle=()=>{
    // if(this.props.navigation.state.routeName!=='Login'){
    //   return false;
    // }
    const nowTime=new Date().getTime();
    if(nowTime-this.state.startTime>2000){
      this.setState({
        startTime:nowTime
      });
        
      ToastAndroid.show('再按一次退出',ToastAndroid.SHORT);
      return true;
    }
    return false;
  }
  _handleChange=(nextAppState)=>{
    if(this.state.currentState.match(/inactive|background/)&&nextAppState==='active'){
      // alert('进入了')
    }else if(this.state.currentState.match(/active/)&&nextAppState!=='active'){
      // alert('出去了')
    }else{
      // alert('切换了')
    }
  }
  _renderItem({item,index}){
    const payload=item;
    return(
      <TouchableOpacity key={index} activeOpacity={0.9}>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle}>总金额{payload.name}</Text>
          <Text style={styles.itemSaying}>{payload.num}<Text style={{fontSize:12}}>{payload.unit}</Text><Text style={{fontSize:20,fontFamily:'simSun'}}>></Text></Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderSep(){
    return <View style={{height:0.8,backgroundColor:colors.gray4,width:'100%'}}></View>
  }
  _renderFooter(){
    return <View style={{paddingVertical:10,borderTopColor:colors.blue,borderTopWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>到底了！！！！！！！</Text></View>
  }
  _renderHeader(){
    return <View style={{paddingVertical:5,borderBottomColor:colors.blue,borderBottomWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>Pull to Refresh</Text></View>
  }
}

const styles=StyleSheet.create({
  HeaderBox:{
    height:180,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    // paddingBottom:20,
    borderBottomColor:colors.gray4,
    borderBottomWidth:1,
    backgroundColor:colors.blue
  },
  HeaderTil:{
    fontSize:30,
    color:colors.white,
  },
  HeaderCnt:{
    fontSize:24,
    color:colors.white
  },
  content:{
    paddingHorizontal:20
  },
  itemBox:{
    paddingVertical:10,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  itemTitle:{
    fontSize:20,
    lineHeight:30,
    color:colors.blue
  },
  itemSaying:{
    alignItems:'center',
    justifyContent:'center',
    lineHeight:30,
    fontSize:16,
    color:colors.orange,
  }
})