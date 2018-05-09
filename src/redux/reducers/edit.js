import {
  CHANGE_ALL
} from '../action'

const initialState={};

export default function editInfor(state=initialState,action){
  switch (action.type){
    case CHANGE_ALL:
      return action.payload;
    default:
      return state;
  } 
}