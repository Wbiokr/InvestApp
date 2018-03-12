import React from 'react';

import PropTypes, { func } from 'prop-types';

import {
  FlatList,
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  AsyncStorage,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { colors } from 'react-native-elements';

// 组件说明
// cbScroll滑动过程回调
// cbBegin滑动开始回调
// cbEnd滑动结束回调
// data数据
// renderItem单元素
// style样式
// ItemSeparatorComponent隔离元素
// isReFreshing刷新状态
// isLoadingMore加载状态

//获取屏幕尺寸
const {width,height}=Dimensions.get('window');

// 未知
const dateKey = 'SwRefresh_date'

// 箭头
const ArrowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';

// 头部文案
export const RefreshTxt={
  pullToRefresh:'下拉刷新',
  releaseToRefresh:'送开刷新数据',
  refreshing:'正在刷新数据...',
}

// 头部组件状态
export const RefreshStatus={
  pullToRefresh:0,
  releaseToRefresh:1,
  refreshing:2,
}

const height0=50;
const height1=height-height0;



export default class Refrest extends React.Component{
  isDraging=false
  isRefreshing=false
  offset=0

  static defaultProps={
    data:[],
    renderItem(){return null},
    onEndReachedThreshold:0.5,
    initialNumToRender:5,
    headerTintColor:'#333',
    footerTintColor:'#333',
    headerStyle:{},
    footerStyle:{},
  }

  constructor(props){
    super(props)
    this.state={
      arrowAngle:new Animated.Value(0),
      refresStatus:RefreshStatus.pullToRefresh,
      refreshTitle:RefreshTxt.pullToRefresh,
      updateTime:'暂无更新'
    }
  }

  
  render(){
    return(
      <FlatList 
        
        ref='myFlatList'

        
        keyExtractor={(item,index)=>{return String(index)}}//单元素ID值
        
        showsVerticalScrollIndicator={false} //垂直方向是否显示滑动条
        
        {...this.props}
        
        style={[this.props.style]}
        
        ListHeaderComponent={this.renderHeader.bind(this)()}//下拉刷新组件

        ListFooterComponent={this.renderFooter.bind(this)()}//上拉加载 组件
        
        scrollEnabled={true}

        scrollEventThrottle={160} //表示滚动过程中，scroll事件被调用的频率
        
        onEndReached={this.props.onEndReached}//加载更多回调事件
        
        onEndReachedThreshold={this.props.onEndReachedThreshold}//触发endReached回调事件的距离单位
        
        onScroll={this.scroll.bind(this)}
        
        onScrollBeginDrag={this.scrollBegin.bind(this)}
        
        onScrollEndDrag={this.scrollEnd.bind(this)}//松手之后回调事件
        
        onMomentumScrollEnd={this.momentumScrollEnd.bind(this)}

        
      />
    )
  }
  componentDidMount(){
    setTimeout(()=>{
      this.scrollToHeight()
    },50)
  }
  scrollToHeight(){
    this.refs.myFlatList.scrollToOffset({
      offset:height,
      animated:false,
    })
  }
  // 滑动方法
  scroll(e){
    if(this.isRefreshing){
      return ;
    }

    let y=e.nativeEvent.contentOffset.y;

    if(this.isDraging){
      if(y<=height1){
        this.setState({
          refreshStatus:RefreshStatus.releaseToRefresh,
          refreshTitle:RefreshTxt.releaseToRefresh,
        });

        Animated.timing(this.state.arrowAngle,{
          toValue:1,
          duration:20,
          easing:Easing.inOut(Easing.quad)
        }).start()
      }else{
        this.setState({
          refreshStatus:RefreshStatus.pullToRefresh,
          refreshTitle:RefreshTxt.pullToRefresh,
        });

        Animated.timing(this.state.arrowAngle,{
          toValue:0,
          duration:100,
          easing:Easing.inOut(Easing.quad)
        }).start()
      }
    }
  }
  //开始滑动事件 
  scrollBegin(e){
    this.isDraging=true;
    this.offset=e.nativeEvent.contentOffset.y;
  }
  //结束滑动
  scrollEnd(e){
    this.isDraging=false;
    let y=e.nativeEvent.contentOffset.y;

      if(y<=height1){
        if(this.isRefreshing){
          this.refs.myFlatList.scrollToOffset({
            offset:height1,
            animated:true,
          })
        }else{
          this.isRefreshing=true;

          this.setState({
            refreshStatus:RefreshStatus.refreshing,
            refreshTitle:RefreshTxt.refreshing,
          })
    
          this.refs.myFlatList.scrollToOffset({
            offset:height1,
            animated:true,
          })
    
          if(this.props.cbEnd){
            this.props.cbEnd(e.nativeEvent,this.endRefresh.bind(this))
          }
        }
      }else{
        if(e.nativeEvent.contentOffset.y>height){
          return ;
        }
        if(this.isRefreshing){
          this.refs.myFlatList.scrollToOffset({
            offset:height1,
            animated:true,
          })
        }else{
          
          this.refs.myFlatList.scrollToOffset({
            offset:height,
            animated:true,
          })
        }
      } 

  }
  // 当一帧滚动完毕时候调用
  momentumScrollEnd(){

  }
  endRefresh(){
    this.isRefreshing=false;
    this.isDraging=false;
    this.setState({
      refreshStatus:RefreshStatus.pullToRefresh,
      refreshTitle:RefreshTxt.pullToRefresh,
    })
    Animated.timing(this.state.arrowAngle,{
      toValue:0,
      duration:100,
      easing:Easing.inOut(Easing.quad)
    })
    this.refs.myFlatList.scrollToOffset({
      offset:height,
      animated:true,
    })
  }
  // 渲染头部组件
  renderHeader(){
    return(
      <View style={headerStyles.wrapper}>
        <View style={[headerStyles.background,this.props.headerStyle]}>
          <View style={headerStyles.status}>
            {this.renderHeaderStatus()}
            {this.renderHeaderTxt()}
          </View>
          <View>
            <Text style={headerStyles.date}>{`上次更新时间：${this.state.updateTime}`}</Text>
          </View>
        </View>
      </View>
    )
  }
  renderHeaderStatus=()=>{
    if(this.state.refreshStatus==RefreshStatus.refreshing){
      return <ActivityIndicator style={{marginRight:3}} animating={true} size='small' color={this.props.headerTintColor}  />
    }
    return (
      <Animated.Image 
        source={{uri:ArrowImage}}
        resizeMode='contain'
        tintColor={this.props.headerTintColor}
        style={
          [
            headerStyles.arrow,
            {
              transform:[{
                rotateZ:this.state.arrowAngle.interpolate({
                  inputRange:[0,1],
                  outputRange:['0deg','-180deg']
                })
              }]
            }
          ]
        }
      />
    )
  }
  renderHeaderTxt(){
    return <Text style={headerStyles.statusTitle}>{this.state.refreshTitle}</Text>
  }
  // 渲染底部组件
  renderFooter(){

  }
}

Refrest.propTypes = {
  data:PropTypes.array.isRequired,
  renderItem:PropTypes.func.isRequired,
  ListEmptyComponent:PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  ItemSeparatorComponent:PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  onEndReachedThreshold:PropTypes.number,
  initialNumToRender:PropTypes.number,
  headerTintColor:PropTypes.oneOfType([
    PropTypes.string
  ]),
  footerTintColor:PropTypes.oneOfType([
    PropTypes.string
  ]),
  headerStyle:PropTypes.object,
  footerStyle:PropTypes.object,
} 


const headerStyles=StyleSheet.create({
  wrapper:{
    height,
    width,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'#ff0'
  },
  background:{
    // flex:1,
    alignItems:'center',
    height:height0,
    width,
    justifyContent:'center',
  },
  status:{
    flexDirection:'row',
    alignItems:'center',
  },
  arrow:{
    width:10,
    height:18,
    marginRight:2
  },
  statusTitle:{
    fontSize:11,
    color:'#333333'
  },
  date:{
    fontSize:9,
    color:'#333333',
    marginTop:2,
    // lineHeight:10,
  }
})