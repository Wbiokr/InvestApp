import React from 'react';
import PropTypes from 'prop-types'

import {
  createStackNavigator
} from 'react-navigation'

import {
  View,
  Text
} from 'react-native'

import Login from './Login'
import Register from './Register'
import Index from './Index'
import { connect } from 'react-redux';


const App = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        // title:'denglu',
        header: null,
      }
    },
    
    Register:{
      screen:Register,
      navigationOptions:{
        header:null,
      }
    },

    Main:{
      screen:Index,
      navigationOptions:{
        header:null
      }
    }
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'screen',

  }
)

class AppRedux extends React.Component{
  static propTypes={
    dispatch:PropTypes.func.isRequired,
    state:PropTypes.object.isRequired,
  }

  render(){
    const {dispatch}=this.props;

    console.log(this.props.state)
    return (
      <App 
        // navigation={{
          // dispatch,
          // state,
          // addListener
        // }}
      /> 
    )
  }
}

const mapStateToProps=state=>({
  state
})

export default connect(mapStateToProps)(AppRedux)