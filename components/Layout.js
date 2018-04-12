// components/layout.js

import React from 'react'
import '../styles/globals.scss'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Loading from '../components/Loading'

export class Layout extends React.Component {

  render () {

    const { children, showHead, isLoading} = this.props

    if (isLoading) {
      return <Loading/>
    }

    return (
      <main role="main">
        {showHead ? <Header/> : null}
        {children}
      </main>
    )

  }
}

Layout.propTypes = {
  children: PropTypes.node,
  showHead: PropTypes.bool,
  isLoading: PropTypes.bool
}

Layout.defaultProps = {
  showHead: false,
  isLoading: false
}

export default Layout