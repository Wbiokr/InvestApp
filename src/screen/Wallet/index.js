import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from 'react-native';

import {
  Avatar,
  List,
  ListItem,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/color';

import RePull from '../../components/RnPull'

// import Pull from '../../components/pull';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      refreshing:false
    }
  }
  render() {
    const list = [
      {
        name: '中国银行',
        logo: 'zgyh',
        cash: 50,
        types: [
          { '余额': 51 }
        ]
      },
      {
        name: '中兴银行',
        logo: 'zxyh',
        cash: 50,
        types: [
          { '余额': 51 }
        ]
      }
    ]
    return (
      <FlatList
        data={list}
        renderItem={this.renderItem.bind(this)}
        // ItemSeparatorComponent={this.renderSep.bind(this)}
        // ListEmptyComponent={this.renderEmpty.bind(this)}
        ListHeaderComponent={this.renderHeader.bind(this)}
        // ListFooterComponent={this.renderFooter.bind(this)}
        keyExtractor={(item, index) => { return String(index) }}
        refreshControl={
          <RePull
            onRefresh={this.getData.bind(this)}
            refreshing={this.state.refreshing} 
          />
        }
      />

    )
  }
  getData(){
    if(this.state.refreshing){
      return ;
    }
    this.setState({refreshing:true})
    setTimeout(()=>{
      this.setState({refreshing:false})
    },3000)
  }
  renderItem(item) {
    return <View style={{}}><Text style={{ color: colors.gray3, height: 60 }}>2121212|{item.key}</Text></View>
  }
  renderHeader() {
    return <View style={{ backgroundColor: colors.gray9, flex: 1 }}>
      <View style={styles.headerBox}>
        <View style={styles.headerTop}>
          <View >
            {
              // <Image source={require('../../img/photo.jpg')} style={styles.photo}></Image>
            }
            <Avatar
              medium
              rounded
              source={require('../../img/photo.jpg')}
              onPress={() => { }}
              activeOpacity={0.7}
              containerStyle={{ backgroundColor: '#fff', transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
              avatarStyle={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
            />
          </View>
          <Text style={[styles.headerTxt, styles.headerTxtBr]}>151****8960</Text>
          <Text style={styles.headerTxt}>wbiokr</Text>
        </View>

        <View style={styles.headerMiddleBox}>
          <View style={[styles.headerMiddleItem, styles.headerTxtBr, { borderRightWidth: 1 }]}>
            <Text style={styles.headerMiddleItemTle}>累计收益(元)</Text>
            <Text style={styles.headerMiddleItemCnt}>52.32</Text>
          </View>
          <View style={styles.headerMiddleItem}>
            <Text style={styles.headerMiddleItemTle}>总资产(元)</Text>
            <Text style={styles.headerMiddleItemCnt}>10000</Text>
          </View>
        </View>

        <View >

          <Text style={styles.headerBottom}>
            <Icon
              name='copyright'
              size={10}
            />
            <Text>&nbsp;&nbsp;账户受法律保护</Text>
          </Text>
        </View>
      </View>
    </View>
  }

}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: colors.blue,
    // height:150,
    paddingBottom: 5,
  },
  headerTop: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  photo: {
    height: 56,
    width: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },

  headerTxt: {
    color: colors.gray8,
    fontSize: 14,
    marginLeft: 20,
    height: 14,
    lineHeight: 14,
  },
  headerTxtBr: {
    borderRightColor: colors.gray8,
    borderRightWidth: 2,
    paddingRight: 20,
  },

  headerMiddleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  headerMiddleItem: {
    paddingHorizontal: 20,
  },
  headerMiddleItemTle: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  headerMiddleItemCnt: {
    color: colors.gray8,
    fontSize: 12,
    textAlign: 'center'
  },
  headerBottom: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.gray1,
    marginTop: 30,
  },
  contentBox: {
    marginTop: 10,
    backgroundColor: colors.white,
    // paddingVertical:5,
  },
  contentItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray9,
    paddingLeft: 20,
    paddingVertical: 5,
  },
  contentItemLeft: {
    fontSize: 14,
    color: colors.gray2
  },
  contentItemRight: {
    fontSize: 12,
    color: colors.orange
  },
  arront: {
    position: 'absolute',
    right: 15,
    top: '50%',
    fontSize: 20,
    color: colors.gray4,
    transform: [{ translateY: -10 }]
  }
})