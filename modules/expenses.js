// modules/expenses.js

import database from '../lib/firebase'
import * as moment from 'moment'
import { createSelector } from 'reselect'


// Actions
//////////

const
  ADD_EXPENSE    = 'expensify/expenses/ADD_EXPENSE',
  REMOVE_EXPENSE = 'expensify/expenses/REMOVE_EXPENSE',
  EDIT_EXPENSE   = 'expensify/expenses/EDIT_EXPENSE',
  SET_EXPENSES   = 'expensify/expenses/SET_EXPENSES'


// Initial State
////////////////

const initialState  = []


// Reducer
//////////

export default (state = initialState , action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [
        ...state,
        action.expense
      ]
    case REMOVE_EXPENSE:
      return state.filter(({ id }) => id !== action.id )
    case EDIT_EXPENSE:
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense
        }
      })
    case SET_EXPENSES:
      return action.expenses
    default:
      return state
  }
}


// Action Creators
//////////////////

/*
  Adds Expense to Firebase DB and on Success dispatches ADD_EXPENSE
*/
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid

    // empty expense
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData

    const expense = { description, note, amount, createdAt }

    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

/*
  ADD_EXPENSE

  Adds Expense to state
 */
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
})

/*
  Removes Expense from Firebase DB then dispatches REMOVE_EXPENSE
*/
export const startRemoveExpense = (id) => {
  return(dispatch, getState) => {

    const uid = getState().auth.uid

    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}))
    })
  }
}

/*
  REMOVE_EXPENSE

  Removes Expense from state
*/

export const removeExpense = ({ id } = {}) => ({
  type: REMOVE_EXPENSE,
  id
})

/*
  startEditExpense

  Edits Expense in Firebase DB then dispatches EDIT_EXPENSE
*/
export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid

    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  }
}

/*
  EDIT_EXPENSE

  Edits Expense in state
*/
export const editExpense = (id, updates) => ({
  type: EDIT_EXPENSE,
  id,
  updates
})

/*
  startSetExpenses

  Gets Expenses for logged in user and dispatches SET_EXPENSES
*/
export const startSetExpenses = () => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid
    const expenses = []

    const expensesArray = (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
    }

    return database.ref(`users/${uid}/expenses`)
      .once('value', (snapshot) => expensesArray(snapshot))
      .then(() => {
        dispatch(setExpenses(expenses))
      })
  }
}

/*
  SET_EXPENSES

  Loads Expenses into state
*/

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses
})


// Selectors
////////////

const selectExpenses = state => state.expenses

const selectFilters = state => state.filters

/*
  selectFilteredExpenses

  Selects Expenses based on filter settings
*/
export const selectFilteredExpenses = createSelector(
  selectExpenses,
  selectFilters,
  (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt)
      const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day') : true
      const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day') : true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

      return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1
      }
    })
  }
)

/*
  selectFilteredExpensesCount

  Selects count of Filtered Expenses
*/
export const selectFilteredExpensesCount = createSelector(
  selectFilteredExpenses,
  (expenses) => expenses.length
)


/*
  selectFilteredExpensesTotal

  Selects Filtered Expenses amount total (sums amounts)
*/
export const selectFilteredExpensesTotal = createSelector(
  selectFilteredExpenses,
  (expenses) => expenses.reduce((total, expense) => total + expense.amount, 0)
)