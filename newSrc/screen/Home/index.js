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
  ActivityIndicator,
  RefreshControl,
  PanResponder,
  // fetch,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {PullView} from 'react-native-pull';

import colors from '../../utils/color';

import url from '../../utils/api'

import format from '../../utils/format';

const investing=url.investing

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cash:[
        // {name:'利民网',cash:1000,rate:100,startTime:'2018-10-24',endTime:12,},
        // {name:'利民网',cash:1000,rate:100,startTime:'2018-10-24',endTime:12,},
        // {name:'利民网',cash:1000,rate:100,startTime:'2018-10-24',endTime:12,},
        // {name:'利民网',cash:1000,rate:100,startTime:'2018-10-24',endTime:12,},
      ],
      currentState:AppState.currentState,
      startTime:0,
      loading:true,
      loadMore:false,
    }
  }
  render(){
    return(
      <LinearGradient 
          colors={[colors.gray1,colors.gray9]}
          style={{flex:1}}
        >

        <View style={styles.HeaderBox} >
          <Text style={styles.HeaderTil}>总在投金额</Text>
          <Text style={styles.HeaderCnt}>10000<Text>元</Text></Text>
        </View>  
        <View style={{flex:1,justifyContent:'center',alignItems:'center',display:this.state.loading?'flex':'none'}}>
  
          <ActivityIndicator color={colors.blue} size='large' animating={true}  style={{transform:[{scaleX:1.8},{scaleY:1.8}]}}/>
          
        </View>
        <FlatList 
          contentContainerStyle={styles.content}
          horizontal={false}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
          showsVerticalScrollIndicator={true}
          pagingEnabled={true}
          scrollEnabled={true}
          // refreshControl={
          //   <RefreshControl 
          //     refreshing={this.state.loadMore}
          //     onRefresh={()=>{
          //       this.setState({loadMore:true})
          //       setTimeout(()=>{this.setState({loadMore:false})},1000)
          //     }}
          //     // size='small'
          //     colors={[colors.green,colors.blue]}
          //   />
          // }
          data={this.state.cash}
          renderItem={this._renderItem}
          keyExtractor={(item,index)=>index}
          ItemSeparatorComponent={this._renderSep}
          // ListFooterComponent={this._renderFooter}
          // ListHeaderComponent={this._renderHeader}
          {...this.panResponder.panHandlers}
        />
      </LinearGradient>
    )
  }
  componentWillMount(){
    this.panResponder=PanResponder.create({
      //要求成为响应者,返回布尔值true表示愿意成为响应者
      onStartShouldSetPanResponder(event,gestureState){
        return true;
      },
      //表示 父组件会劫持这个响应事件，自己成为响应者
      onStartShouldSetResponderCapture(event,gestureState){
        return true;
      },

      //触摸的过程中，是否愿意成为响应者
      onMoveShouldSetPanResponder(event,gestureState){
        return true;
      },
      // 表示滑动过程中，父组件会劫持这个响应事件，自己成为响应者
      onMoveShouldSetPanResponderCapture(event,gestureState){
        return true;
      },

      //表示申请成功，成为了事件响应者，这个时候开始，组件就进入激活状态
      onPanResponderGrant(event,gestureState){
        console.log('申请成功')
      },
      //表示申请失败，其他组件正在进行事件处理，并且那个优先级别高的人不愿意放弃事件处理，只能等着
      onPanResponderReject(event,gestureState){
        console.log('申请失败')
      },

      // 申请成功之后，监听接下来的事件
      // 表示手指按下时候，成功申请为事件响应者的回调
      onRespinderStart(event,gestureState){
        console.log('开始')
      },
      // 手机拖动箭筒
      onPanResponderMove(event,gestureState){
        console.log('移动')
        console.log(event.nativeEvent,gestureState)
      },
      // 触摸事件完成，并且释放了手指
      onPanResponderRelease(event,gestureState){
        console.log(10)
        console.log(event.nativeEvent,gestureState)
      },
      // 结束了事件响应的回调
      onPanResponderEnd(event,gestureState){
        console.log(7)
        console.log(event.nativeEvent,gestureState)
      },
      // 另一个组件成为了新的响应者
      onPanResponderTerminate(){
        console.log('newe')
      },
      onPanResponderTerminationRequest(event,gestureState){
        console.log(8)
        console.log(event.nativeEvent,gestureState)
      },
      //决定当前组件是否应该阻止原生组件成为JS响应者（仅支持Android）
      onShouldBlockNativeResponder(event,gestureState){
        return true;
      },
      
    })
  }
  componentDidMount(){
    this._getCash();
    AppState.addEventListener('change',this._handleChange)
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.addEventListener('hardwareBackPress',this._backHandle)
    }
  }
  componentWillUnmount(){
    AppState.removeEventListener('change');
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.removeEventListener('hardwareBackPress',this._backHandle)
    };
    
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
      <TouchableOpacity key={index} activeOpacity={0.7}>
        <View style={styles.itemBox}>
           <View style={styles.itemTitle}>
              <Text style={[styles.itemTitleTxt]}>{item.name}</Text>
              <Text style={[styles.itemTitleTxt,{color:colors.blue}]}>{item.endTime}天</Text>
           </View>

           <View style={styles.itemCnt}>
              <View style={styles.itemCntItem}>
                <Text style={styles.itemCntItemTop}>{item.startTime}</Text>
                <Text style={styles.itemCntItemBottom}>成交时间</Text>
              </View>
              <View style={styles.itemCntItem}> 
                <Text style={[styles.itemCntItemTop,{textAlign:'center'}]}>{item.cash}</Text>
                <Text style={[styles.itemCntItemBottom,{textAlign:'center'}]}>投资金额</Text>
              </View>
              <View style={styles.itemCntItem}>
                <Text style={[styles.itemCntItemTop,{textAlign:'right'}]}>{item.rate}</Text>
                <Text style={[styles.itemCntItemBottom,{textAlign:'right'}]}>总利息</Text>
              </View>
           </View>
        </View>
      </TouchableOpacity>
    )
  }
  _renderSep(){
    return <View style={{height:10,backgroundColor:'transparent',width:'100%'}}></View>
  }
  _renderFooter(){
    return <View style={{paddingVertical:10,borderTopColor:colors.blue,borderTopWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>到底了！！！！！！！</Text></View>
  }
  _renderHeader(){
    return <View style={{paddingVertical:5,borderBottomColor:colors.blue,borderBottomWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>Pull to Refresh</Text></View>
  }
  _getCash=()=>{
    console.log(investing)
    fetch(investing,{
      method:'POST',
      headers:{
        "Content-Type":'application/x-www-form-urlencoded',
      },
      body:format({
        page:1,
      })
    })
    .then(res=>res.json())
    .then(res=>{
        setTimeout(()=>{this.setState({
          loading:false,
        })
        if(Number(res.code)===1){
          this.setState({
            cash:res.result
          })
        }else{
          ToastAndroid.show(res.msg,ToastAndroid.SHORT)
        }
      },1)
      
    })
    .catch(err=>console.log(err))
    .done(()=>{
      
    })
    
  }
}



const styles=StyleSheet.create({
  HeaderBox:{
    height:130,
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
    // paddingHorizontal:20
  },
  itemBox:{
    paddingVertical:10,
    paddingHorizontal:20,
    flexDirection:'column',
    justifyContent:'flex-start',
    backgroundColor:colors.gray10,
  },
  itemTitle:{
    borderBottomColor:colors.gray1,
    borderBottomWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  itemTitleTxt:{
    fontSize:15,
    color:colors.gray5,
    height:30,
    lineHeight:20
  },
  itemCnt:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  itemCntItem:{
    paddingTop:6,
    flex:1,
  },
  itemCntItemTop:{
    fontSize:13,
    color:colors.gray3,
    lineHeight:20,
  },
  itemCntItemBottom:{
    fontSize:10,
    color:colors.gray7,
    lineHeight:15,
  } 
})