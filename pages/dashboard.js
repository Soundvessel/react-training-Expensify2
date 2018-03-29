import React from 'react'

import Layout from '../components/Layout'
import ExpenseList from '../components/ExpenseList'
import requireFireAuth from '../lib/requireFireAuth'
import ExpenseListFilters from '../components/ExpenseListFilters'
import ExpensesSummary from '../components/ExpensesSummary'

const Dashboard = () => (
  <Layout showHead={true}>
    <ExpensesSummary/>
    <ExpenseList />
  </Layout>
)

export default requireFireAuth(Dashboard)