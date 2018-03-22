// components/layout.js

import React from 'react'
import '../styles/styles.scss'
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
  showHead: PropTypes.oneOf(
    [true, false]
  ),
  isLoading: PropTypes.oneOf(
    [true, false]
  )
}

Layout.defaultProps = {
  showHead: false,
  isLoading: false
}

export default Layout