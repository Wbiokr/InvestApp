import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

import {
  Avatar, 
  List,
  ListItem,
  // Icon,
} from 'react-native-elements';

import  Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/color';

import Pull from '../../components/pull';


export default class App extends React.Component{
  render(){
    const list=[
      {
        name:'中国银行',
        logo:'zgyh',
        cash:50,
        types:[
          {'余额':51}
        ]
      },
      {
        name:'中兴银行',
        logo:'zxyh',
        cash:50,
        types:[
          {'余额':51}
        ]
      }
    ]
    return(
      <View style={{backgroundColor:colors.gray9,flex:1}}>
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
                onPress={()=>{}}
                activeOpacity={0.7}
                containerStyle={{backgroundColor:'#fff',transform:[{scaleX:1.4},{scaleY:1.4}]}}
                avatarStyle={{transform:[{scaleX:0.95},{scaleY:0.95}]}}
              />
            </View>
            <Text style={[styles.headerTxt,styles.headerTxtBr]}>151****8960</Text>
            <Text style={styles.headerTxt}>wbiokr</Text>
          </View>
          
          <View style={styles.headerMiddleBox}>
            <View style={[styles.headerMiddleItem,styles.headerTxtBr,{borderRightWidth:1}]}>
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

        <Pull 
            // isReFreshing={this.state.status}
            // isLoadingMore={false}
            style={{height:200}}
            headerStyle={{}}
            footerStyle={{}}
            headerTintColor={colors.blue}
            footerTintColor={colors.red}
            data={[{key:12},{key:'fdsfsd'},{key:8989},{key:99999},{key:'fsffffffffff'},{key:8989},{key:99999},{key:'fsffffffffff'}]}
            initialNumToRender={3}
            onEndReachedThreshold={5}
            renderItem={({item,index})=>{
              return <View key={index} style={{}}><Text style={{color:colors.gray3,height:60}}>2121212|{item.key}</Text></View>
            }}
            ItemSeparatorComponent={()=>{return <View style={{height:2,backgroundColor:'#f00'}}></View>}}
            
            cbScroll={(e)=>{console.log(e)}}
            cbBegin={(e)=>{console.log(e);ToastAndroid.show('323233',ToastAndroid.SHORT)}}
            cbEnd={(e,cb)=>{console.log(e);;ToastAndroid.show('212',ToastAndroid.SHORT);setTimeout(cb,10000)}}

            cbReFreshing={e=>{}}
            cbLoadingMore={e=>{}}
        />

        {
        //   <List containerStyle={{marginTop:0,borderTopWidth:0}}>
        //   {
        //     list.map((item,i)=>{
        //       const url=`../../img/wallet/${item.logo}`
        //       return <ListItem 
        //         key={i}
        //         component={TouchableHighlight}
        //         activeOpacity={1}
        //         underlayColor={colors.gray9}
        //         avatar={
        //           <Avatar small rounded source={require('../../img/wallet/zxyh.png')}/>
        //         }
        //         // containerStyle={{marginTop:90}}
        //         // wrapperStyle={{marginTop:0}}
        //         title={String(item.name)}
        //         rightTitle={String(item.cash)+'元'}
        //         // switchButton
        //         // hideChevron
        //         // onSwitch={()=>{alert(1221)}}
        //         // textInput
        //         // onPress={()=>{alert(4554)}}
        //         onLongPress={()=>{}}
        //       />
        //     })
        //   }
        // </List>
        }


        
        
      </View>
    )
  }
}

const styles=StyleSheet.create({
  headerBox:{
    backgroundColor:colors.blue,
    // height:150,
    paddingBottom:5,
  },
  headerTop:{
    paddingHorizontal:30,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  photo:{
    height:56,
    width:56,
    borderRadius:28,
    overflow:'hidden',
  },
  // photoBox:{
  //   // height:60,
  //   // width:60,
  //   backgroundColor:colors.gray8,
  //   // borderRadius:31,
  //   overflow:'hidden',
  //   padding:2
  // },
  headerTxt:{
    color:colors.gray8,
    fontSize:14,
    marginLeft:20,
    height:14,
    lineHeight:14,
  },
  headerTxtBr:{
    borderRightColor:colors.gray8,
    borderRightWidth:2,
    paddingRight:20,
  },

  headerMiddleBox:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
  },
  headerMiddleItem:{
    paddingHorizontal:20,
  },
  headerMiddleItemTle:{
    color:colors.white,
    fontSize:14,
    textAlign:'center',
  },
  headerMiddleItemCnt:{
    color:colors.gray8,
    fontSize:12,
    textAlign:'center'
  },
  headerBottom:{
    fontSize:10,
    textAlign:'center',
    color:colors.gray1,
    marginTop:30,
  },
  contentBox:{
    marginTop:10,
    backgroundColor:colors.white,
    // paddingVertical:5,
  },
  contentItem:{
    borderBottomWidth:1,
    borderBottomColor:colors.gray9,
    paddingLeft:20,
    paddingVertical:5,
  },
  contentItemLeft:{
    fontSize:14,
    color:colors.gray2 
  },
  contentItemRight:{
    fontSize:12,
    color:colors.orange
  },
  arront:{
    position:'absolute',
    right:15,
    top:'50%',
    fontSize:20,
    color:colors.gray4,
    transform:[{translateY:-10}]
  }
})