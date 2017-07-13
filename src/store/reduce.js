import {createStore, combineReducers} from 'redux';

let defaultState = {
  isLogin: false,
  user: null,
  accesstoken: null
}

function user(state=defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLogin: true,
        user: action.user,
        accesstoken: action.accesstoken
      }
      break;
    case 'LOGOUT':
      return {
        isLogin: false,
        user: null,
        accesstoken: null
      }
      break;
    default:
      return state
  }
}
let store = createStore(combineReducers({user}))

export default store;
