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

        @import '../styles/global/variables';

        .list-item {
          border: 1px solid darken($off-white, 7%);
          border-top: none;
          color: $dark-grey;
          display: flex;
          flex-direction: column;
          padding: $s-size;
          text-decoration: none;
          transition: background-color .3s ease;

          &:hover,
          &:focus {
            background-color: $off-white;
          }

          @media (min-width: $desktop-breakpoint) {
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            padding: $m-size;
          }
        }

        .list-item--message {
          align-items: center;
          color: $grey;
          justify-content: center;
          padding: $m-size;

          &:hover,
          &:focus {
            background-color: transparent;
          }
        }

        .list-item__title {
          margin: 0;
          word-break: break-all;
        }

        .list-item__sub-title {
          color: $grey;
          font-size: $font-size-s;
        }

        .list-item__data {
          margin: $s-size 0 0;
          @media (min-width: $desktop-breakpoint) {
            margin: 0;
            padding-left: $s-size;
          }
        }

      `}</style>
    </a>
  </Link>
)

export default ExpenseListItem