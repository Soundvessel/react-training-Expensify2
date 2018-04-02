import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { startLogout } from '../actions/auth'

export const Header = () => (

  <header className="header">
    <div className="content-container">
      <div className="header__content">

        <Link href="/dashboard" >
          <a className="header__title">
          <h1>Expensify</h1>
          </a>
        </Link>
        <button type="button" className="btn btn--noBg" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)