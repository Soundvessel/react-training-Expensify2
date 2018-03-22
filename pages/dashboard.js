import React from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../store'

import Layout from '../components/Layout'

const Dashboard = () => (
  <Layout showHead={true}>
    <h1>Dashboard</h1>
  </Layout>
)

export default withRedux(initStore, null, null)(Dashboard)