import React from 'react';

import {
  AsyncStorage,
  Alert,
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

import Radios from '../../components/RadioBox'

const investing = url.record

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.showMenu=this.showMenu.bind(this);
    this.state = {
      cash: [
      ],
      currentState: AppState.currentState,
      startTime: 0,
      Loading: true,
      refreshing: false,
      loadMore: false,
      show: false,
      // x:10,
      // y:300,
      item: {},
      page: 1,
      size: 10,
      isLoadMore: false,
      alt: false,
      index: '',
    }
    this.getCash = this.getCash.bind(this)
    this.cbMenu = this.cbMenu.bind(this)
  }
  render() {
    let content = <FlatList
      data={this.state.cash}
      renderItem={this.renderItem.bind(this)}
      ItemSeparatorComponent={this.renderSep.bind(this)}
      keyExtractor={(item, index) => String(index)}
      refreshControl={
        <RePull
          onRefresh={() => {

            this.refresh.bind(this)()

          }}
          refreshing={this.state.refreshing}
        />
      }
    // onEndReached={this.loadMore.bind(this)}
    // onEndReachedThreshold={0.1}
    />
    return (
      <LinearGradient
        colors={[colors.gray1, colors.gray9]}
        style={{ flex: 1 }}
      >
        {this.state.Loading ? <Loading /> : null}
        <TouchableNativeFeedback>
          <View style={styles.HeaderBox} >

            <View style={styles.HeaderItem}>
              <Text style={styles.HeaderCnt}>{this.state.totalAdd || '--'}<Text style={{ fontSize: 10 }}>&lt;{this.state.totalMonth || '--'}&gt;</Text></Text>
              <Text style={styles.HeaderTil}>累计本金<Text style={{ fontSize: 8 }}>&lt;在投&gt;</Text></Text>
            </View>

            <View style={styles.HeaderItem}>
              <Text style={styles.HeaderCnt}>{this.state.allEarn || '--'}<Text style={{ fontSize: 10 }}>&lt;{this.state.monthEarn || '--'}&gt;</Text></Text>
              <Text style={styles.HeaderTil}>累计撸毛<Text style={{ fontSize: 8 }}>&lt;本月&gt;</Text></Text>
            </View>

            <View style={styles.HeaderItem}>
              <Text style={styles.HeaderCnt}>{this.state.redBag || '--'}<Text style={{ fontSize: 10 }}>&lt;{this.state.rate || '--'}&gt;</Text></Text>
              <Text style={styles.HeaderTil}>已返红包<Text style={{ fontSize: 8 }}>&lt;代收利息&gt;</Text></Text>
            </View>

          </View>
        </TouchableNativeFeedback>

        {
          content
        }

        {
          this.state.alt ? <Radios list={[{ txt: '查看信息' }, { txt: '编辑' }, { txt: '删除' }, { txt: '取消' }]} cb={this.cbMenu} /> : null
        }

      </LinearGradient>
    )
  }
  componentDidUpdate() {
    // if(this.props.navigation.state.params&&this.props.navigation.state.params.type==='update'){
    //   // this.setState({Loading:true});
    //   // this.getCash()
    // }
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      //要求成为响应者,返回布尔值true表示愿意成为响应者
      onStartShouldSetPanResponder(event, gestureState) {
        return true;
      },
      //表示 父组件会劫持这个响应事件，自己成为响应者
      onStartShouldSetResponderCapture(event, gestureState) {
        return true;
      },

      //触摸的过程中，是否愿意成为响应者
      onMoveShouldSetPanResponder(event, gestureState) {
        return true;
      },
      // 表示滑动过程中，父组件会劫持这个响应事件，自己成为响应者
      onMoveShouldSetPanResponderCapture(event, gestureState) {
        return true;
      },

      //表示申请成功，成为了事件响应者，这个时候开始，组件就进入激活状态
      onPanResponderGrant(event, gestureState) {
        console.log('申请成功')
      },
      //表示申请失败，其他组件正在进行事件处理，并且那个优先级别高的人不愿意放弃事件处理，只能等着
      onPanResponderReject(event, gestureState) {
        console.log('申请失败')
      },

      // 申请成功之后，监听接下来的事件
      // 表示手指按下时候，成功申请为事件响应者的回调
      onRespinderStart(event, gestureState) {
        console.log('开始')
      },
      // 手机拖动箭筒
      onPanResponderMove(event, gestureState) {
        console.log('移动')
        console.log(event.nativeEvent, gestureState)
      },
      // 触摸事件完成，并且释放了手指
      onPanResponderRelease(event, gestureState) {
        console.log(10)
        console.log(event.nativeEvent, gestureState)
      },
      // 结束了事件响应的回调
      onPanResponderEnd(event, gestureState) {
        console.log(7)
        console.log(event.nativeEvent, gestureState)
      },
      // 另一个组件成为了新的响应者
      onPanResponderTerminate() {
        console.log('newe')
      },
      onPanResponderTerminationRequest(event, gestureState) {
        console.log(8)
        console.log(event.nativeEvent, gestureState)
      },
      //决定当前组件是否应该阻止原生组件成为JS响应者（仅支持Android）
      onShouldBlockNativeResponder(event, gestureState) {
        return true;
      },

    })
  }
  componentDidMount() {

    this.refresh();
    AppState.addEventListener('change', this.handleChange)
    if (Platform.OS.toLowerCase() === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }
  }
  componentWillUnmount() {
    AppState.removeEventListener('change');
    if (Platform.OS.toLowerCase() === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    };

  }


  backHandle = () => {
    const nowTime = new Date().getTime();
    if (nowTime - this.state.startTime > 2000) {
      this.setState({
        startTime: nowTime
      });

      ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
      return true;
    }
    return false;
  }
  handleChange = (nextAppState) => {
    if (this.state.currentState.match(/inactive|background/) && nextAppState === 'active') {
      // alert('进入了')
    } else if (this.state.currentState.match(/active/) && nextAppState !== 'active') {
      // alert('出去了')
    } else {
      // alert('切换了')
    }
  }

  renderItem({ item, index }) {
    const payload = item;


    return (
      <TouchableOpacity
        // background={TouchableNativeFeedback.SelectableBackground()}
        // underlayColor='transparent'
        // onPress={()=>{}}
        // activeOpacity={0.7}
        // delayLongPress={100}
        onLongPress={this.showMenu.bind(this, index)}
        activeOpacity={0.7}
      >
        <View style={styles.itemBox}>
          <View style={styles.itemTitle}>
            <Text style={[styles.itemTitleTxt]}>{item.name}<Text>-{item.phone}-{item.card}</Text> </Text>
            <Text style={[styles.itemTitleTxt, { color: colors.blue }]}>{item.endTime}天</Text>
          </View>

          <View style={styles.itemCnt}>
            <View style={styles.itemCntItem}>
              <Text style={styles.itemCntItemTop}>{item.startTime}</Text>
              <Text style={styles.itemCntItemBottom}>成交时间</Text>
            </View>
            <View style={styles.itemCntItem}>
              <Text style={[styles.itemCntItemTop, { textAlign: 'center' }]}>{item.cash}</Text>
              <Text style={[styles.itemCntItemBottom, { textAlign: 'center' }]}>投资金额</Text>
            </View>
            <View style={styles.itemCntItem}>
              <Text style={[styles.itemCntItemTop, { textAlign: 'right' }]}>{item.rateAll}({item.rateHas})</Text>
              <Text style={[styles.itemCntItemBottom, { textAlign: 'right' }]}>总利息(已返)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderSep() {
    return <View style={{ height: 10, backgroundColor: 'transparent', width: '100%' }}></View>
  }
  renderFooter() {
    return <View style={{ paddingVertical: 10, borderTopColor: colors.blue, borderTopWidth: 0.5 }}><Text style={{ fontSize: 12, color: colors.blue, textAlign: 'center' }}>到底了！！！！！！！</Text></View>
  }
  renderHeader() {
    return <View style={{ paddingVertical: 5, borderBottomColor: colors.blue, borderBottomWidth: 0.5 }}><Text style={{ fontSize: 12, color: colors.blue, textAlign: 'center' }}>Pull to Refresh</Text></View>
  }
  showMenu(i) {

    this.setState({
      index: i,
      alt: true,
    })
  }
  cbMenu(i) {
    // this.setState({
    //   alt: false,
    // })
    if (Number(i) === 0) {
      AsyncStorage.setItem('editItem', JSON.stringify(this.state.cash[this.state.index]))
        .then((res) => {
          alert(res)
          this.props.navigation.navigate('Add', { type: 'Watch' })
        })

    } else if (Number(i) === 1) {
      AsyncStorage.setItem('editItem', JSON.stringify(this.state.cash[this.state.index]), () => {
        this.prop.navigation.navigate('Add', { type: 'Edit' })

      })
    } else if (Number(i) === 2) {
      this.setState({
        Loading: true
      })
      fetch(url.delete, {
        method: 'post',
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
        },
        body: format({
          _id: this.data[this.state.index]['_id']
        })
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            Loading: false,
          })
          if (res.code == 0 || res.code == -1) {
            Alert.alert(res.msg)
          } else if (res.code == 1) {
            Alert.alert(res.msg)
            let data = this.state.data
            data.splice(this.state.index, 1)
            this.setState({
              data
            })
          }
        })
    }else {
      ToastAndroid.show('您已取消！',ToastAndroid.SHORT)
    }

  }

  cancel() {
    this.setState({
      show: false
    })
  }
  loadMore() {
    this.getCash(
      () => {
        if (this.state.refreshing || this.state.isLoadMore) {
          return;
        }
        this.setState({
          page: this.state.page + 1,
          isLoadMore: true
        })
      },
      (res) => {
        if (Number(res.code) === 1) {
          this.setState({
            cash: this.state.cash.concat(res.result)
          })
        }
      }
    )
  }
  refresh() {
    this.getCash.bind(this)(
      () => {
        if (this.state.refreshing || this.state.isLoadMore) {
          return;
        }
        this.setState({
          page: 1,
          refreshing: true
        })
      },
      (res) => {
        if (Number(res.code) === 1) {
          this.setState({
            cash: res.result
          })
        }
      }
    )
  }
  getCash = (cbBefore, cbAfter) => {

    cbBefore && cbBefore()

    fetch(investing, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      body: format({
        page: this.state.page,
        size: this.state.size,
      })
    })
      .then(res => res.json())
      .then(res => {
        cbAfter && cbAfter(res)
      })
      .catch(err => alert(err))
      .done(() => {
        setTimeout(() => {
          this.setState({
            refreshing: false,
            Loading: false,
            isLoadMore: false,
          })
        }, 300)
      })

  }
}



const styles = StyleSheet.create({
  HeaderBox: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingBottom:20,
    borderBottomColor: colors.gray4,
    borderBottomWidth: 1,
    backgroundColor: colors.blue
  },
  HeaderItem: {
    // flex:1
    flexDirection: 'column',
  },
  HeaderTil: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center'
  },
  HeaderCnt: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.white
  },
  content: {
    // paddingHorizontal:20
  },
  itemBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.gray10,
  },
  itemTitle: {
    borderBottomColor: colors.gray1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitleTxt: {
    fontSize: 15,
    color: colors.gray5,
    height: 30,
    lineHeight: 20
  },
  itemCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCntItem: {
    paddingTop: 6,
    flex: 1,
  },
  itemCntItemTop: {
    fontSize: 13,
    color: colors.gray3,
    lineHeight: 20,
  },
  itemCntItemBottom: {
    fontSize: 10,
    color: colors.gray7,
    lineHeight: 15,
  }
})