export const CHANGE_ALL='CHANGE_ALL';

export function changeAllObj(payload){
  return {
    type:CHANGE_ALL,
    payload,
  }
}