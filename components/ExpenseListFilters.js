import React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../modules/filters'


export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  onSortChange = (e) => {

    switch(e.target.value)
    {
      case "date":
        this.props.sortByDate()
        break
      case "amount":
        this.props.sortByAmount()
        break
    }
  }

  render() {

    const { text, sortBy, startDate, endDate } = this.props.filters

    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              value={text}
              onChange={this.onTextChange}
              placeholder="Search Expenses"
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={startDate ? moment(startDate) : null}
              startDateId="startDateId"
              endDate={endDate ? moment(endDate) : null}
              endDateId="endDateId"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              startDatePlaceholderText="Start Date"
              endDatePlaceholderText="End Date"
            />
            {/* Datepicker module theming */}
            <style jsx global>{`
              @import 'react-dates/lib/css/datepicker';
            `}</style>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)