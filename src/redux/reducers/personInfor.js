import {
  CHANGE_LIST_ALL,
  UPDATE_KEYS
} from '../action'

const initialState={
  name:'wbiokr',
  phones:[
    15138678960,
    13186962939,
  ],
  cards:[
    8733,
    5728,
  ],
  totalCash:1010101,
  totalEarn:12121,
}

export default function(state=initialState,action){
  switch(action.type){
    case CHANGE_LIST_ALL:
      return action.payload;
    case UPDATE_KEYS:
      return Object.assign({},state,action.payload);
    default:
      return state;
  }
}