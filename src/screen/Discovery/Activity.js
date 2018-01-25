import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  // ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {
  TabNavigator
} from 'react-navigation'

import formatData from '../../deploy/formData';

// import Title from '../../components/Head/Title';

import MyIndicator from '../../components/Load/Loading';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      isEnd: false,
      loading: true,
      activitys: [
      ],
      page: 1,
      loadMoreStatus: 0,
    }
    this.getData = this.getData.bind(this);
  }
  render() {
    if (this.state.isLoading && !this.state.isError) {
      return this._renderLoading()
    }
    if (this.state.isError) {
      return this._renderError()
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>

        <FlatList
          style={{ height: 400 }}
          data={this.state.activitys}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => this._renderItem(item)}
          ItemSeparatorComponent={this._separator}
          ListEmptyComponent={this._renderLoading}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          onRefresh={() => {
            
            this.getData(1)
          }}
          refreshing={this.state.loading}
          bounces={true}
          alwaysBounceVertical={true}
        />
      </View>

    )
  }
  componentDidMount() {
    this.getData(1);
  }

  _separator() {
    return <View style={styles.separator}></View>
  }
  stamp(time){
    const timeStamp=new Date(Number(time))
    return timeStamp.toLocaleDateString().replace(/\//g,'-')+'  '+timeStamp.toTimeString().substr(0,5)
  }
  _renderItem(props) {

    return <TouchableOpacity activeOpacity={0.7} style={styles.item} key={props.id}>
      <View style={styles.img}>
        <TouchableHighlight onPress={()=>{this.toH5(props.ext)}}>
          <Image
            resizeMode='stretch'
            style={[styles.imgCnt, { height:Dimensions.get('window').width / 2 - 10 }]}
            source={{ uri: props.image }}
            
          />
        </TouchableHighlight>
        
        {this._renderZezhan(props.endTime)}
      </View>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.summary}>{this.stamp(props.startTime)}</Text>
      </View>
    </TouchableOpacity>
  }
  _renderZezhan(stamp){
    if(Number(stamp)>new Date().getTime()){
      return ;
    }
    return <TouchableOpacity activeOpacity={0.8}  style={styles.Zezhao }>
              <View style={styles.ZezhaoCnt}>
                <Text style={styles.line}></Text>
                <Text style={styles.label}>活动结束</Text>
                <Text style={styles.line}></Text>
              </View>
          </TouchableOpacity>
  }
  _renderError() {
    return (
      <View><Text> Fail </Text> </View>
    )
  }
  _renderLoading() {
    return <MyIndicator />
  }
  _renderFooter = () => {
    const status = Number(this.state.loadMoreStatus);
    if (status === 0) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator
            animating={true}
            size='small'
            color='#ca6'
          />
          <Text style={styles.footerTxt}>正在加载数据</Text>
        </View>
      )

    }
    if (status === 1) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerTxt}>没有更多数据了</Text>
        </View>
      )
    }
    return (
      <View style={styles.footer}>
        <Text style={styles.footerTxt}>一鼎理财，存管正在介入中</Text>
      </View>
    )
  }
  _empty() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>暂无数据</Text>
      </View>
    )
  }
  onEndReached=()=> {
    const status = Number(this.state.loadMoreStatus);

    //0表示正在读取数据
    //1表示数据已经到底
    //2表示读取数据完毕
    console.log(status)
    if (status === 1 || status=== 0) {
      return;
    };

    this.setState({
      loadMoreStatus: 0,
    });

    this.getData()

  }
  toH5(ext){
    const url=JSON.parse(ext).url;
    alert(`地址为${url}`)

  }
  getData=(v)=>{
    let page=this.state.page;

    if(v){
      this.setState({
        page:1,
        isEnd:false,
        aaa:23232
      });
      page=1;
    }




    this.setState({
      loadMoreStatus:0,
    })

    if (this.state.isEnd&&!v) {
      // ToastAndroid.show('数据已经加载完毕！', ToastAndroid.SHORT)
      return;
    }
    
    fetch('https://tapi.youdingkeji.com/yiding-rest/rest/message/getHistoryEvent.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formatData({
        page,
        versionName: ''
      })

    })
      .then(res => res.json())
      .then(res => {
        if (Number(res.code) === 0) {
          const activitys = res.result.map((item, idx) => {
            return Object.assign({}, item, {
              image: `https://timage.youdingkeji.com/${item.image}`
            })
          })
          const newActivitys = Number(this.state.page) === 1 ? activitys : this.state.activitys.concat(activitys);
          this.setState({
            activitys: newActivitys,
            loading: false,
            isLoading: false,
            loadMoreStatus: 2,
            page:page+1,
          });
          console.log(res.result)
          if (res.result.length === 0) {
            this.setState({
              isEnd: true,
              loadMoreStatus: 1
            })
          }

        }
      })
      .catch(err => {
        this.setState({
          isError: true
        })
      })
      .done();
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: '#fff',
  },
  img: {
    flex: 1,
    // height:340,
    borderRadius: 6,
    overflow: 'hidden'
  },
  imgCnt: {
    flex: 1,
    borderRadius: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#dedede',
    // width
  },
  title: {
    marginTop: 4,
    lineHeight: 30,
    color: '#666',
    fontSize: 16
  },
  summary: {
    color: '#ccc',
    fontSize: 14
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    flexDirection:'row',
  },
  footerTxt: {
    color: '#999',
    fontSize: 14,
  },
  Zezhao:{
    // justifyContent:'space-around',
    // alignItems:'center',
    // flexDirection:'row',
    flex:1,
    position:'absolute',
    top:0,
    left:0,
    height:'100%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    borderRadius:6,
  },
  ZezhaoCnt:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    flex:1,
    paddingHorizontal:10,
  },
  line:{
    height:2,
    backgroundColor:'#fff',
    width:30
  },
  label:{
    fontSize:20,
    color:'#fff',
    // paddingHorizontal:10,
  }
})





