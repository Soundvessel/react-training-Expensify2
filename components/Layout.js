// components/layout.js

import React from 'react'
import '../styles/styles.scss'

const Layout = ({ children }) => (
  <main role="main">
    <h1>Layout</h1>
    {children}
  </main>
)

export default Layout