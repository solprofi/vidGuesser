import * as actionTypes from './actionTypes';

export const setUser = currentUser => ({
  type: actionTypes.SET_USER,
  payload: {
    currentUser,
  }
})

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER,
})