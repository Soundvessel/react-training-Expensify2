// lib/requireFireAuth.js

import withRedux from 'next-redux-wrapper'
import React from 'react'
import {
  branch,
  compose,
  hoistStatics, lifecycle,
  renderComponent,
  setDisplayName,
  withState
} from 'recompose'
import Loading from '../components/Loading'
import initStore from '../store'
import { firebase } from '../lib/firebase'
import { login, logout } from '../actions/auth'
import { startSetExpenses } from '../actions/expenses'
import Router from 'next/router'

const mapDispatchToProps = { login, logout, startSetExpenses }

const authenticatedPageDidMount = function() {

  const { login, logout, startSetExpenses, setHasAuth } = this.props

  firebase.auth().onAuthStateChanged((user) => {

    if (!user) {
      logout()
      Router.push('/')
    } else {
      setHasAuth(true)
      login(user.uid)
      startSetExpenses()
    }
  })
}

const Placeholder = () => (
  <div>
    <Loading/>
  </div>
)

// Use `hoistStatics` to ensure that wrapped page's `getInitialProps`
// is accessible to `withRedux`.
export default compose(
  withRedux(initStore, null, mapDispatchToProps),
  setDisplayName('AuthenticatedPage'),
  hoistStatics(
    compose(
      withState('hasAuth', 'setHasAuth', false),
      lifecycle({
        componentDidMount: authenticatedPageDidMount
      }),
      branch(
        ({hasAuth}) => !hasAuth,
        renderComponent(Placeholder),
      ),
    )
  )
)
