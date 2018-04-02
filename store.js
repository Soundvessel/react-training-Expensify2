import { applyMiddleware, combineReducers, createStore } from 'redux'
import createDebounce from 'redux-debounced'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import { requireEnvVar } from './lib/utils'
import api from './middlewares/api'
import * as reducers from './modules'
//import { SIGN_OUT_SUCCESS } from './modules/auth'

const getInitialState = () => ({
  config: {
    //apiUrl: requireEnvVar('API_SERVER'),
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  },
})

const appReducer = combineReducers({
  config: (state = {}) => state,
  ...reducers,
})

const rootReducer = (state, action) => {
  // Reset state to initialState upon sign out
  // See https://stackoverflow.com/q/35622588/956688
  // if (action.type === SIGN_OUT_SUCCESS) {
  //   // Do not reset config state
  //   state = { config: state.config }
  // }

  return appReducer(state, action)
}

export default (initialState, { isServer }) => {
  const middlewares = [createDebounce(), thunk, api]

  // Load config into state on server side
  const preloadedState = isServer ? getInitialState() : initialState

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}
