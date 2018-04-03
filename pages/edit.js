import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import ExpenseForm from '../components/ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../modules/expenses'
import requireFireAuth from '../lib/requireFireAuth'


export class EditExpensePage extends React.Component {
  static getInitialProps ({ query: { id } }) {
    return { id }
  }

  onSubmit = (expense) => {
    this.props.startEditExpense( this.props.id, expense )
    Router.push('/dashboard')
  }
  onRemove = () => {
    this.props.startRemoveExpense( this.props.id )
    Router.push('/dashboard')
  }
  render () {

    if (!this.props.expense) {
      return "loading..."
    }

    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button type="button" className="btn btn--alt" onClick={this.onRemove}>Remove Expense</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.id)
})

const ConnectedEditExpensePage = connect(mapStateToProps, { startEditExpense, startRemoveExpense })(EditExpensePage)

export default requireFireAuth(ConnectedEditExpensePage);