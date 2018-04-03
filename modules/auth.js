// modules/auth.js

import { firebase, googleAuthProvider } from '../lib/firebase'


// Actions
//////////

const
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'

// Initial State
////////////////

const initialState  = {}


// Reducer
//////////

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}


// Action Creators
//////////////////

/*
  startLogin

  Triggers Firebase Google Auth Provider popup to sign in with Google Account
*/
export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

/*
  LOGIN

  Adds uid to auth state
*/
export const login = (uid) => ({
  type: LOGIN,
  uid
})

/*
  startLogout

  Signs Google Account out from Firebase Auth Provider
*/
export const startLogout = () => {
  firebase.auth().signOut()
}

/*
  LOGOUT

  Removes uid from auth state
*/
export const logout = () => ({
  type: LOGOUT
})