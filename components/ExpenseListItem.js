import React from 'react'
import { Link } from '../routes'
import moment from 'moment'
import numeral from 'numeral'

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <Link route="edit" params={{ id }}>
    <a className="list-item">
      <div>
        <h3 className="list-item__title">{ description }</h3>
        <span className="list-item__sub-title">{ moment(createdAt).format('MMMM Do, YYYY') }</span>
      </div>
      <h3 className="list-item__data">{ numeral(amount / 100).format('$0,0.00') }</h3>
      {/*language=SCSS*/}
      <style jsx>{`

        @import 'ExpenseListItem';

      `}</style>
    </a>
  </Link>
)

export default ExpenseListItem