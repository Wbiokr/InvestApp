export const CHANGE_LIST_ALL='CHANGE_LIST_ALL';

export const CHANGE_LIST_CAT='CHANGE_LIST_CAT';

export const UPDATE_KEYS='UPDATE_KEYS'

export function changeAllObj(payload){
  return {
    type:CHANGE_LIST_ALL,
    payload,
  }
}

