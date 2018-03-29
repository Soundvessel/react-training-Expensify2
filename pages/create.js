import React from 'react'
import Layout from '../components/Layout'
import ExpenseForm from '../components/ExpenseForm'
import { startAddExpense } from "../actions/expenses"
import requireFireAuth from '../lib/requireFireAuth'
import initStore from '../store'


class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense)
    //this.props.history.push('/')
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

//export default connect(undefined, mapDispatchToProps)(AddExpensePage)
export default requireFireAuth(initStore, null, { startAddExpense })(AddExpensePage)