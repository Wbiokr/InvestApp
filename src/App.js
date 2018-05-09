import React from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import naviga, {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';

import Login from './screen/Login';
import Index from './screen/Index';

import { Provider, connect } from 'react-redux';

import store from './redux/index.js'

console.log(store.getState())
console.log(naviga)
// import Pass from './screen/Pass';

// AsyncStorage

const RoutesConfig = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Index: {
      screen: Index,
    },
  },
  {
    initialRouteName: 'Login',
    initialRouteParams: {
      name: 'chen'
    },
    navigationOptions: {

    },
    headerMode: 'float',
    mode: 'modal',
  }
)

// export default RoutesConfig


class App extends React.Component {
  static propTypes={
    dispatch:PropTypes.func.isRequired,
    nav:PropTypes.object.isRequired,
  }
  render() {
    const {dispatch,nav}=this.props;
    return (
      <RoutesConfig 
        // navigation={
        //   {
        //     dispatch,
        //     state:nav,

        //   }
        // }
      />
    )
  }
}

const mapStateToProps=state=>({
  nav:state.edit
})

export default connect(mapStateToProps)(App)