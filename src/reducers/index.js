import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialUserState = {
  currentUser: null,
  isLoading: true,
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false,
      }
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default combineReducers({
  user: userReducer,
});