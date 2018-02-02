import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  Avatar, 
  // Icon,
} from 'react-native-elements';

import  Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../utils/color';


export default class App extends React.Component{
  render(){
    return(
      <ScrollView style={{backgroundColor:colors.gray9}}>
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

        <View style={[styles.contentBox,{marginTop:0}]}>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
         
        </View>

        <View style={[styles.contentBox]}>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.contentItemLeft}>固定金额</Text>
            <Text style={styles.contentItemRight}>12121</Text>
            <Text style={styles.arront}><Icon name='angle-right' size={25}/></Text>
          </View>
         
        </View>

        
        
      </ScrollView>
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