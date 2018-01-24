import url from './Api';

import color from './Color';

import format from './formData';

import {
  Dimensions
} from 'react-native';

global.config={
  width:Dimensions.get('window').width,
  height:Dimensions.get('window').height,
  url,
  color,
  format,
  stamp(time){
    const timeStamp=new Date(Number(time))
    return timeStamp.toLocaleDateString().replace(/\//g,'-')+'  '+timeStamp.toTimeString().substr(0,5)
  },
}