import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import ExpenseForm from '../components/ExpenseForm'
import { startAddExpense } from "../modules/expenses"
import requireFireAuth from '../lib/requireFireAuth'
import { connect } from 'react-redux'


class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense)
    Router.push('/dashboard')
  }
  render() {
    return (
      <Layout showHead={true}>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </Layout>
    )
  }
}

const ConnectedAddExpensePage = connect(null, { startAddExpense })(AddExpensePage)

export default requireFireAuth(ConnectedAddExpensePage);