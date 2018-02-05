import React from 'react';

import {
  View,
  Text,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// ios-sync

export default class Pull extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {emptyComponent}=this.props;
    return(
      <FlatList
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={emptyComponent}
      />
    )
  }
  renderHeader(){
    return(
      <View>
        <Text>header</Text>
      </View>
    )
  }
  renderFooter(){
    return(
      <View>
        <Text>footer</Text>
      </View>
    )
  }
}