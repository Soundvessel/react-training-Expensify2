import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { startLogout } from '../modules/auth'

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
    {/*language=SCSS*/}
    <style jsx>{`

      @import '../styles/global/variables';

      .header {
        background-color: $dark-blue;
      }

      .header__content {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding-top: $s-size;
        padding-bottom: $s-size;
      }

      .header__title {
        color: white;
        text-decoration: none;

        h1 {
          margin: 0;
        }
      }

    `}</style>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)