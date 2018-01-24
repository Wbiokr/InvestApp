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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {
  TabNavigator
} from 'react-navigation'

import formatData from '../../deploy/formData';

import Title from '../../components/Head/Title';

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
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => this._renderItem(item)}
          ItemSeparatorComponent={this._separator}
          ListEmptyComponent={this._renderLoading}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={1}
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
    this.getData();
  }

  _separator() {
    return <View style={styles.separator}></View>
  }
  _renderItem(props) {
    // const url=`https://timage.youdingkeji.com/${props.image}`;
    return <TouchableOpacity activeOpacity={0.7} style={styles.item} key={props.id}>
      <View style={styles.img}>
        <Image
          resizeMode='stretch'
          style={[styles.imgCnt, { height: global.config.width / 2 - 10 }]}
          source={{ uri: props.image }}
        />

      </View>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.summary}>{global.config.stamp(props.startTime)}</Text>
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
            color='#ccc'
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
    if (status === 1 || 0) {
      return;
    };

    this.setState({
      loadMoreStatus: 0,
      page: this.state.page + 1
    });

    this.getData()

  }
  getData=(v)=> {
    console.log(this.state)
    if (this.state.isEnd&&!v) {
      ToastAndroid.show('数据已经加载完毕！', ToastAndroid.SHORT)
      return;
    }
    if(v){
      this.setState({
        p:1,
        isEnd:false,
      })
    }
    fetch(global.config.url.activity, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formatData({
        page: this.state.page,
        versionName: '1.3.1'
      })

    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // this.setState({
        //   isLoading:false,
        // })
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
          });

          if (!res.result.length < 3) {
            this.setState({
              isEnd: true,
              loadMoreStatus: 1
            })
          }

          console.log(this.state.page, this.state.activitys)
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
    paddingTop: 4
  },
  footerTxt: {
    color: '#999',
    fontSize: 12,
  }
})





