import React from 'react';

import {
  Animated,
  StyleSheet,
} from 'react-native'

export default class AnimatedLabel extends React.Component{
  constructor(props){
    super(props)
    this.state={
      animatedTran:new Animated.ValueXY({x:0,y:30}),
    }
  }
  render(){
    return <Animated.Text
            style={[
              StyleSheet.text,
              this.props.style,
              {
                opacity:this.state.animatedTran.x,
                transform:[
                  {scale:this.state.animatedTran.x},
                  // {translateX:this.state.animatedTran.y},
                ]
              }
            ]} 
           >{this.props.children}</Animated.Text>
  }
  focus(){
    Animated.timing(
      this.state.animatedTran,
      {
        toValue:{x:1,y:0},
        duration:200,
        // easing:
      }
    ).start()
  }
  blur(){
    Animated.timing(
      this.state.animatedTran,
      {
        toValue:{x:0,y:-30},
        duration:100,
      }
    ).start()
  }
}

const styles=StyleSheet.create({
  text:{
    position:'absolute',
    left:0,
    top:0,
  }
})