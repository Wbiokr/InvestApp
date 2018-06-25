import {
  CHANGE_LIST_ALL
} from '../action'

const initialState={
  totalCash: '',
  totalRate: '',
  totalBag: '',
  totalRateUnit: '',
  totalCashUnit: '',
  totalBagUnit: '',
};

export default function editInfor(state=initialState,action){
  switch (action.type){
    case CHANGE_LIST_ALL:
      return action.payload;
    default:
      return state;
  } 
}