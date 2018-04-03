// modules/filters.js

import * as moment from 'moment'


// Actions
//////////

const
  SET_TEXT_FILTER = 'expensify/filters/SET_TEXT_FILTER',
  SORT_BY_AMOUNT  = 'expensify/filters/SORT_BY_AMOUNT',
  SORT_BY_DATE    = 'expensify/filters/SORT_BY_DATE',
  SET_START_DATE  = 'expensify/filters/SET_START_DATE',
  SET_END_DATE    = 'expensify/filters/SET_END_DATE'


// Initial State
////////////////

const initialState = {
  // date sort filtered by current month
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
}


// Reducer
//////////

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      }
    case SORT_BY_AMOUNT:
      return {
        ...state,
        sortBy: 'amount'
      }
    case SORT_BY_DATE:
      return {
        ...state,
        sortBy: 'date'
      }
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}


// Action Creators
//////////////////

/*
  SET_TEXT_FILTER

  Applies text filtering
*/
export const setTextFilter = (text = '') => ({
  type: SET_TEXT_FILTER,
  text
})

/*
  SORT_BY_DATE

  Applies date filtering
*/
export const sortByDate = () => ({
  type: SORT_BY_DATE
})

/*
  SORT_BY_AMOUNT

  Applies sorting by amount
*/
export const sortByAmount = () => ({
  type: SORT_BY_AMOUNT
})

/*
  SET_START_DATE

  Sets date filtering start date
*/
export const setStartDate = (startDate) => ({
  type: SET_START_DATE,
  startDate
})

/*
  SET_END_DATE

  Sets date filtering end date
*/
export const setEndDate = (endDate) => ({
  type: SET_END_DATE,
  endDate
})