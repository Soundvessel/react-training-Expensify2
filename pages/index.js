import withRedux from 'next-redux-wrapper'
//import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
//import { Alert } from 'react-bootstrap'
//import SignInFormContainer from '../containers/auth/SignInFormContainer'
//import { retrieveUser } from '../modules/auth'
import initStore from '../store'

import Layout from '../components/Layout'
import { firebase } from '../lib/firebase'
import { startLogin, login, logout } from '../modules/auth'
import { startSetExpenses } from '../modules/expenses'

class Index extends React.Component {

  state = {
    isLoading: true
  }

  componentDidMount() {

    const isLoaded = () => {
      this.setState({
        isLoading: false
      })
    }

    const {login, logout, startSetExpenses} = this.props

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        login(user.uid)
        startSetExpenses().then(() => {
          Router.push('/dashboard')
        })

      } else {
        logout()
        isLoaded()
      }
    })
  }

  render() {
    const { startLogin } = this.props

    return (
      <Layout showHead={false} isLoading={this.state.isLoading}>
        <div className="box-layout">
          <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time ot get your expenses under control.</p>
            <button type="button" className="btn" onClick={startLogin}>Login with Google</button>
          </div>
        </div>
        {/*language=SCSS*/}
        <style jsx>{`

          @import '../styles/global/variables';

          .box-layout {
            background-image: url('/static/images/bg.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
          }

          .box-layout__box {
            background: fade-out(white, .15);
            border-radius: 3px;
            padding: $l-size $m-size;
            text-align: center;
            width: 25rem;
          }

          .box-layout__title {
            margin: 0 0 $m-size;
            line-height: 1;
          }

        `}</style>
      </Layout>
    )
  }
}

export default withRedux(initStore, null, { startLogin, login, logout, startSetExpenses })(Index)
