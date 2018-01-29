import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import colors from '../../utils/color';

export default class App extends React.Component{
  
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

        <ScrollView>
          <TouchableOpacity>
            <View>
              <Text>总负债金额</Text>
              <Text>3000<Text>元</Text></Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View>
              <Text>总负债金额</Text>
              <Text>3000<Text>元</Text></Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View>
              <Text>总负债金额</Text>
              <Text>3000<Text>元</Text></Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View>
              <Text>总负债金额</Text>
              <Text>3000<Text>元</Text></Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    )
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
  }
})