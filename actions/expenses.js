import database from '../lib/firebase'

// -- without Thunk
// component calls action generator
// action generator returns object
// component dispatches object
// redux stores changes

// -- with Thunk
// component calls action generator
// action generator returns function
// component dispatches function (?)
// function runs (has the the ability to dispatch other actions and do whatever it wants)


// ADD_EXPENSE

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid

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


// REMOVE_EXPENSE

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

export const startRemoveExpense = (id) => {
  return(dispatch, getState) => {

    const uid = getState().auth.uid

    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({id}))
    })
  }
}


// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {

    const uid = getState().auth.uid

    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  }
}


// SET_EXPENSES

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

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