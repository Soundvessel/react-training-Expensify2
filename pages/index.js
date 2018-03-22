import withRedux from 'next-redux-wrapper'
//import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
//import { Alert } from 'react-bootstrap'
//import Loading from '../components/Loading'
//import SignInFormContainer from '../containers/auth/SignInFormContainer'
//import { retrieveUser } from '../modules/auth'
import initStore from '../store'
import '../styles/styles.scss'

import { firebase } from '../lib/firebase'
import { startLogin, login, logout } from '../actions/auth'
import { startSetExpenses } from '../actions/expenses'

class Index extends React.Component {
  state = {
    signedIn: null,
  }

  componentDidMount() {

    const {login, logout, startSetExpenses} = this.props

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        login(user.uid)
        startSetExpenses().then(() => {
          // render
          // if (history.location.pathname === '/') {
          //   history.push('/dashboard')
          // }

          // next route to dashboard
          console.log('Logged In')
        })

      } else {
        console.log('Logged Out')
        logout()
        //Router.push('/')
      }
    })
  }

  render() {
    const { startLogin } = this.props

    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="vox-layout__title">Expensify</h1>
          <p>It's time ot get your expenses under control.</p>
          <button type="button" className="btn" onClick={startLogin}>Login with Google</button>
        </div>
      </div>
    )
  }
}



export default withRedux(initStore, null, { startLogin, login, logout, startSetExpenses })(Index)
