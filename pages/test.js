import React from 'react'
import requireFireAuth from '../lib/requireFireAuth'

import Layout from '../components/Layout'

const Test = () => (
  <Layout showHead={true}>
    <h1>Test</h1>
  </Layout>
)

export default requireFireAuth(Test)