import {
  CHANGE_LIST_ALL,
  CHANGE_LIST_CAT
} from '../action';

const initialState=[1,2]

export default function(state=initialState,action){
  switch(action.type){
    case CHANGE_LIST_ALL:
      return action.payload;
    case CHANGE_LIST_CAT:
      return Object.assign({},state,payload);
    default:
      return state;
  }
}