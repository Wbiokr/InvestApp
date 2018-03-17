import React from 'react';

import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native'

import colors from '../utils/color'

export default class RadioBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      animatedScale: new Animated.Value(0)
    }
  }
  render() {
    return (
      <Animated.View
        style={[styles.animated,{
          // transform: [
          //   { scale:0},
          // ],
          // height:'0%',width:'0%',
          opacity:this.state.animatedScale
        }]}
      >
        <View style={[styles.container]}>
          <ScrollView style={{
            height:this.props.list.length>5?200:this.props.list.length*40
          }}>
            {
              this.props.list.map((item, index) => {
                return <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => { this.changeIndex(index) }}
                  key={item.txt}
                >

                  <View style={styles.wrapper}>

                    <Text style={[
                      styles.radio,
                      {backgroundColor:index===this.state.index?colors.blueGreen:colors.gray4}
                    ]}></Text>
                    <Text style={
                      [
                        styles.text,
                        {color:index===this.state.index?colors.blueGreen:colors.gray5}
                      ]
                    }>{item.txt}</Text>

                  </View>

                </TouchableNativeFeedback>
              })
            }
          </ScrollView>
        </View>
      </Animated.View>
    )
  }
  componentDidMount() {
  }
  animate(v){
    Animated.timing(
      this.state.animatedScale,
      {
        toValue:v,
        duration:150,
      }
    ).start()
  }
  changeIndex(index){
    this.setState({index})
  }
}

const styles = StyleSheet.create({
  animated: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    // transform: [
    //   { scaleY: 0 }
    // ],

    // opacity:0,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  container: {
    backgroundColor:'#fff',
    paddingVertical:10,
    width:250,
    borderRadius:6,
    overflow:'hidden'
  },
  wrapper: {
    height: 40,
    width: 280,
    backgroundColor: '#fff',
    paddingHorizontal:15,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  radio: {
    height:10,
    width:10,
    borderRadius:5,
    marginRight:10,
  },
  text: {

  }
})