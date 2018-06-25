import {combineReducers} from 'redux';

import investList from './investList';
import investInfor from './investInfor';
import personInfor from './personInfor';

export default combineReducers({
  investList,
  investInfor,
  personInfor,
})