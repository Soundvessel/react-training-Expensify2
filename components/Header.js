import React from 'react'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'

import { startLogout } from '../actions/auth'
import initStore from '../store'

export const Header = () => (

  <header className="header">
header
  </header>
)

export default withRedux(initStore, null, null)(Header)