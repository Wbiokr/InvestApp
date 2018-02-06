import React from 'react';

import PropTypes from 'prop-types';

import {
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';

export default class Refrest extends React.Component{
  static defaultProps={
    data:[],

  }
  render(){
    return(
      <FlatList 
        style={[{flex:1},this.props.style]}
        ref='flatList'
        data={this.props.data}
        ItemSeparatorComponent={this.props.ItemSeparatorComponent}
        ListEmptyComponent={this.props.ListEmptyComponent}
        renderItem={this.props.renderItem}
        initialNumToRender={this.props.initialNumToRender}
        refreshing={this.props.refreshing}
        keyExtractor={(item,index)=>{return String(index)}}
        onRefresh={this.props.onRefresh}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        onEndReached={this.props.onEndReached}
      />
    )
  }
}

Refrest.propTypes = {
  data:PropTypes.array.isRequired,
  renderItem:PropTypes.func.isRequired,
  ListEmptyComponent:PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
//  ListFooterComponent
  ItemSeparatorComponent:PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  initialNumToRender:PropTypes.number,
  onEndReached:PropTypes.func.isRequired,
  onEndReachedThreshold:PropTypes.number.isRequired,
  refreshing:PropTypes.bool.isRequired,
  refreshControl:PropTypes.element,
  onRefresh:PropTypes.func.isRequired,
  tintColor:PropTypes.oneOfType([
    PropTypes.string
  ])
} 