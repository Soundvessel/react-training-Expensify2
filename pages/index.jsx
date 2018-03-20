import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import { Alert } from 'react-bootstrap'
import Loading from '../components/Loading'
import SignInFormContainer from '../containers/auth/SignInFormContainer'
import { retrieveUser } from '../modules/auth'
import initStore from '../store'
import '../styles/style.scss'

class Index extends React.Component {
  state = {
    signedIn: null,
  }

  componentDidMount() {
    const { retrieveUser } = this.props

    retrieveUser()
      .then(() => (
        Router.replace('/projects')
      ))
      .catch(() => (
        this.setState({
          signedIn: false,
        })
      ))
  }

  render() {
    const { signedIn } = this.state
    const { error } = this.props.url.query

    return (
      <div>
        <Head>
          <title>React Starter</title>
        </Head>
        {error && <Alert bsStyle="danger">{error}</Alert>}
        {signedIn === false ? <SignInFormContainer/> : <Loading/>}
      </div>
    )
  }
}

export default withRedux(initStore, null, { retrieveUser })(Index)
