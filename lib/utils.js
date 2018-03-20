import { FORM_ERROR } from 'final-form'
import { mapValues, startCase } from 'lodash'
import moment from 'moment'

/**
 * Load the value of an environment variable and throw an error if not defined
 *
 * @param {string} varName
 * @return {*}
 */
export const requireEnvVar = (varName) => {
  const envVar = process.env[varName]
  if (!envVar) {
    throw new Error(`${varName} environment variable must be defined!`)
  }
  return envVar
}

/**
 * Return a promise that resolves after `delay` milliseconds
 *
 * @param {int} delay The time, in milliseconds, to sleep
 * @return {Promise}
 */
export const sleep = (delay) => (
  new Promise((resolve) => setTimeout(resolve, delay))
)

/**
 * Wrap a promise with a function for canceling it.
 *
 * @param {Promise} promise
 * @return {{promise: Promise<any>, cancel: function}}
 */
export const makeCancelable = (promise) => {
  let hasCanceled_ = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true
    },
  }
}

/**
 * Return a Moment object if `dateString` is a valid date string.
 * Otherwise return the falsey value.
 *
 * @param {string|*} dateString
 * @return {*|Moment}
 */
export const stringToMoment = (dateString) => (
  dateString && moment(dateString)
)

/**
 * Return a function that can accept an error returned by our API and returns
 * an error object to be used by Final Form.
 *
 * @see https://github.com/final-form/final-form#onsubmit-values-object-callback-errors-object--void--object--promiseobject--void
 * @param {string} [defaultErrorMessage] The error message to use if one is
 *   not provided by the API
 * @return {function}
 */
export const mapFinalFormErrors = (defaultErrorMessage = 'An error occurred.') => (serverError) => {
  const { errors, message } = serverError

  const formErrors = mapValues(errors, (error, name) => (
    `${startCase(name)} ${error}`
  ))

  formErrors[FORM_ERROR] = message || defaultErrorMessage

  return formErrors
}

/**
 * Calculate percentage and return 0 if divisor is 0.
 *
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
export const calculatePercentage = (dividend, divisor) => {
  if (divisor === 0) {
    return 0
  }

  return Math.round(dividend / divisor * 100)
}
