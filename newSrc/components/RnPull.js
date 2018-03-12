import React from 'react'

import {
  RefreshControl,
  
  StyleSheet,
} from 'react-native'

export default class Refresh extends React.Component{
  render(){
    return <RefreshControl
        refreshing={true}
        onRefresh={()=>{}}
        colors={['#d00','#fe2','#ca5']}
        enabled={true}
        // progressBackgroundColor={'rgba(0,0,0,0.3)'}
        size={RefreshControl.SIZE.small}
        progressViewOffset={50}
        {...this.props}
    />
  }
}