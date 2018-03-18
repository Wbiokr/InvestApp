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
  TouchableNativeFeedback,
  // TouchableWithoutFeedback,
  // fetch,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import colors from '../../utils/color';

import url from '../../utils/api'

import format from '../../utils/format';

import ShowLert from '../../components/show'

// import Pull from '../../components/pull'
import RePull from '../../components/RnPull'

import Loading from '../../components/Loading';

const investing=url.investing

export default class App extends React.Component{
  constructor(props){
    super(props);
    // this.showMenu=this.showMenu.bind(this);
    this.state={
      cash:[
      ],
      currentState:AppState.currentState,
      startTime:0,
      Loading:true,
      refreshing:false,
      loadMore:false,
      show:false,
      x:10,
      y:300,
      item:{},
      page:1,
      pageSize:10,
      isLoadMore:false,
    }
    this.getCash=this.getCash.bind(this)
  }
  render(){
    let content=this.state.Loading
            ?<Loading />
            :<FlatList 
              data={this.state.cash}
              renderItem={this.renderItem.bind(this)}
              ItemSeparatorComponent={this.renderSep.bind(this)}
              keyExtractor={(item,index)=>String(index)}
              refreshControl={
                <RePull
                  onRefresh={()=>{

                    this.refresh.bind(this)()

                  }}
                  refreshing={this.state.refreshing}
                />
              }
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.1}
            />
    return(
      <LinearGradient 
          colors={[colors.gray1,colors.gray9]}
          style={{flex:1}}
        >

        <View style={styles.HeaderBox} >
          <Text style={styles.HeaderTil}>总在投金额</Text>
          <Text style={styles.HeaderCnt}>10000<Text>元</Text></Text>
        </View>  
        
        {
          content
        }

      </LinearGradient>
    )
  }
  componentDidUpdate(){
    // if(this.props.navigation.state.params&&this.props.navigation.state.params.type==='update'){
    //   // this.setState({Loading:true});
    //   // this.getCash()
    // }
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
    
    this.refresh();
    AppState.addEventListener('change',this.handleChange)
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.addEventListener('hardwareBackPress',this.backHandle)
    }
  }
  componentWillUnmount(){
    AppState.removeEventListener('change');
    if(Platform.OS.toLowerCase()==='android'){
      BackHandler.removeEventListener('hardwareBackPress',this.backHandle)
    };
    
  }


  backHandle=()=>{
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
  handleChange=(nextAppState)=>{
    if(this.state.currentState.match(/inactive|background/)&&nextAppState==='active'){
      // alert('进入了')
    }else if(this.state.currentState.match(/active/)&&nextAppState!=='active'){
      // alert('出去了')
    }else{
      // alert('切换了')
    }
  }
  
  renderItem({item,index}){
    const payload=item;
    
    return(
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.SelectableBackground()}
        underlayColor='transparent'
        onPress={()=>{}}
        activeOpacity={0.7}
        delayLongPress={100}
        onLongPress={this.showMenu.bind(this)}
        
        >
        <View style={styles.itemBox}>
           <View style={styles.itemTitle }>
              <Text style={[styles.itemTitleTxt]}>{item.name}<Text>-{item.phone}-{item.card}</Text> </Text>
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
                <Text style={[styles.itemCntItemTop,{textAlign:'right'}]}>{item.rateAll}({item.rateHas})</Text>
                <Text style={[styles.itemCntItemBottom,{textAlign:'right'}]}>总利息(已返)</Text>
              </View>
           </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
  renderSep(){
    return <View style={{height:10,backgroundColor:'transparent',width:'100%'}}></View>
  }
  renderFooter(){
    return <View style={{paddingVertical:10,borderTopColor:colors.blue,borderTopWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>到底了！！！！！！！</Text></View>
  }
  renderHeader(){
    return <View style={{paddingVertical:5,borderBottomColor:colors.blue,borderBottomWidth:0.5}}><Text style={{fontSize:12,color:colors.blue,textAlign:'center'}}>Pull to Refresh</Text></View>
  }
  showMenu(e){
    const x=e.nativeEvent.pageX;
    const y=e.nativeEvent.pageY;

    this.setState({
      x,y,
      show:true
    })

  }
  edit(item){
  }
  remove(item){
  }
  cancel(){
    this.setState({
      show:false
    })
  }
  loadMore(){
    // this.setState({isLoadMore:true})
    this.getCash(
      ()=>{
        alert(1111)
        if(this.state.refreshing||this.state.isLoadMore){
          return ;
        }
        this.setState({
          page:this.state.page+1,
          isLoadMore:true
        })
      },
      (res)=>{
        if(Number(res.code)===1){
          this.setState({
            cash:this.state.cash.concat(res.result)
          })
        }
      }
    )
  }
  refresh(){
    this.getCash.bind(this)(
      ()=>{
        if(this.state.refreshing||this.state.isLoadMore){
          return ;
        }
        this.setState({
          page:1,
          refreshing:true
        })
      },
      (res)=>{
        if(Number(res.code)===1){
          this.setState({
            cash:res.result
          })
        }
      }
    )
  }
  getCash=(cbBefore,cbAfter)=>{

    cbBefore&&cbBefore()
    
    fetch(investing,{
      method:'POST',
      headers:{
        "Content-Type":'application/x-www-form-urlencoded',
      },
      body:format({
        page:this.state.page,
        pageSize:this.state.pageSize,
      })
    })
    .then(res=>res.json())
    .then(res=>{

        cbAfter&&cbAfter(res)
          // if(Number(res.code)===1){
          //   this.setState({
          //     cash:this.state.page==1?res.result:this.state.cash.concat(res.result),
          //     page:++this.state.page,
          //   })
          // }else{
          //   if(!this.state.isLoadMore){
          //     this.setState({
          //       cash:[],
          //     })
          //   }
          //   ToastAndroid.show(res.msg,ToastAndroid.SHORT)
          // }
    })
    .catch(err=>console.log(err))
    .done(()=>{
      setTimeout(()=>{
        this.setState({
          refreshing:false,
          Loading:false,
          isLoadMore:false,
        })
      },300)
    })
    
  }
}



const styles=StyleSheet.create({
  HeaderBox:{
    height:80,
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