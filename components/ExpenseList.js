import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import { selectFilteredExpenses } from '../modules/expenses'


export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
    {
      props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No Expenses</span>
        </div>
      ) : (
        props.expenses.map((expense) => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )
    }
    </div>
    {/*language=SCSS*/}
    <style jsx>{`

      @import '../styles/global/variables';

      .list-header {
        background-color: $off-white;
        border: 1px solid darken($off-white, 7%);
        color: $grey;
        padding: $s-size $m-size;

        display: flex;
        justify-content: space-between;
      }

      .list-body {
        margin-bottom: $m-size;

        @media (min-width: $desktop-breakpoint) {
          margin-bottom: $l-size;
        }
      }

    `}</style>
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectFilteredExpenses(state)
  }
}

export default connect(mapStateToProps)(ExpenseList)