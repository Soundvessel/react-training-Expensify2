import { camelizeKeys } from 'humps'
import mapValues from 'lodash/mapValues'
import startCase from 'lodash/startCase'
import Router from 'next/router'
import { createSelector } from 'reselect'
import { removeAuthHeaders, setAuthHeaders } from '../lib/session'
import { CALL_API, HTTP_METHODS } from '../middlewares/api'
import { sleep } from '../lib/utils'

// API Actions
const SIGN_IN_REQUEST             = '/auth/SIGN_IN_REQUEST'
const SIGN_IN_SUCCESS             = '/auth/SIGN_IN_SUCCESS'
const SIGN_IN_FAILURE             = '/auth/SIGN_IN_FAILURE'
const SIGN_OUT_REQUEST            = '/auth/SIGN_OUT_REQUEST'
const SIGN_OUT_SUCCESS            = '/auth/SIGN_OUT_SUCCESS'
const SIGN_OUT_FAILURE            = '/auth/SIGN_OUT_FAILURE'
const RETRIEVE_USER_REQUEST       = '/auth/RETRIEVE_USER_REQUEST'
const RETRIEVE_USER_SUCCESS       = '/auth/RETRIEVE_USER_SUCCESS'
const RETRIEVE_USER_FAILURE       = '/auth/RETRIEVE_USER_FAILURE'
const ACCEPT_INVITATION_REQUEST   = '/auth/ACCEPT_INVITATION_REQUEST'
const ACCEPT_INVITATION_SUCCESS   = '/auth/ACCEPT_INVITATION_SUCCESS'
const ACCEPT_INVITATION_FAILURE   = '/auth/ACCEPT_INVITATION_FAILURE'
const CHANGE_PASSWORD_REQUEST     = '/auth/CHANGE_PASSWORD_REQUEST'
const CHANGE_PASSWORD_SUCCESS     = '/auth/CHANGE_PASSWORD_SUCCESS'
const CHANGE_PASSWORD_FAILURE     = '/auth/CHANGE_PASSWORD_FAILURE'

// Modal Actions
const SET_CHANGE_PASSWORD_MODAL   = '/auth/SET_CHANGE_PASSWORD_MODAL'

export { SIGN_OUT_SUCCESS }

// Initial State
const initialState = {
  user: {},
  changePassword: {
    showModal: false,
  },
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case RETRIEVE_USER_SUCCESS:
    case ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      }

    case SET_CHANGE_PASSWORD_MODAL: {
      const showModal = action.payload

      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          showModal: showModal,
        },
      }
    }

    default:
      return state
  }
}

// Selectors

const selectFormState = form => state => state.auth[form]
export const selectUser = () => state => state.auth.user
export const selectShowChangePasswordModal = () => state => state.auth.changePassword.showModal

export const selectIsSignedIn = () => createSelector(
  selectUser(),
  user => typeof user.id === 'number'
)

// Action Creators

export const openChangePasswordModal = () => ({
  type: SET_CHANGE_PASSWORD_MODAL,
  payload: true,
})

export const closeChangePasswordModal = () => ({
  type: SET_CHANGE_PASSWORD_MODAL,
  payload: false,
})

export const signIn = (user) => (dispatch) => {
  const signInAction = {
    [CALL_API]: {
      types: [SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE],
      endpoint: 'users/sign_in',
      method: HTTP_METHODS.POST,
      body: { user },
    },
  }

  return dispatch(signInAction)
    .then((response) => {
      setAuthHeaders(response.user.email, response.authToken)
      return Router.push('/projects')
    })
}

export const acceptInvitation = (user) => (dispatch) => {
  const acceptInvitationAction = {
    [CALL_API]: {
      types: [ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_FAILURE],
      endpoint: 'users/invitation',
      method: HTTP_METHODS.PUT,
      body: { user },
    },
  }

  return dispatch(acceptInvitationAction)
    .then(() => Router.push('/'))
}

export const signOut = () => (dispatch) => {
  const signOutAction = {
    [CALL_API]: {
      types: [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE],
      endpoint: 'users/sign_out',
      method: HTTP_METHODS.DELETE,
    },
  }

  return dispatch(signOutAction)
    .then(() => {
      removeAuthHeaders()
      return Router.push('/')
    })
}

export const retrieveUser = () => ({
  [CALL_API]: {
    types: [RETRIEVE_USER_REQUEST, RETRIEVE_USER_SUCCESS, RETRIEVE_USER_FAILURE],
    endpoint: 'users/me',
  },
})

export const changePassword = (user) => (dispatch) => {
  const changePasswordAction = {
    [CALL_API]: {
      types: [CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE],
      endpoint: 'users',
      method: HTTP_METHODS.PUT,
      body: { user },
    },
  }

  return dispatch(changePasswordAction)
    .then(() => sleep(2000))
    .then(() => dispatch(closeChangePasswordModal()))
}
