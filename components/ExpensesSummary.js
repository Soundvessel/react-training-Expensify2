import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import numeral from 'numeral'

import { selectExpenses, selectExpensesTotal } from '../modules/expenses'


export const ExpenseSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <strong>{expenseCount}</strong> {expenseWord} totalling <strong>{ formattedExpensesTotal}</strong></h1>
        <div className="page-header__actions">
          <Link href="/create">
            <a className="btn">Add Expense</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  }
}

export default connect(mapStateToProps)(ExpenseSummary)