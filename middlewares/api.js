import { camelizeKeys, decamelizeKeys } from 'humps'
import fetch from 'isomorphic-unfetch'
import param from 'jquery-param'
import { isPlainObject, isUndefined, omitBy } from 'lodash'
import Router from 'next/router'
import { normalize } from 'normalizr'
import url from 'url'
import { getAuthHeaders, removeAuthHeaders } from '../lib/session'

// Available HTTP request methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

const UNAUTHORIZED_REDIRECT_PATH = '/'

const handleError = (response, json) => {
  if (response.status === 401) {
    // Unauthorized
    // Remove auth headers and redirect to index unless already on index
    removeAuthHeaders()
    if (Router.route !== UNAUTHORIZED_REDIRECT_PATH) {
      Router.replace({
        pathname: UNAUTHORIZED_REDIRECT_PATH,
        query: { error: json.message },
      }, UNAUTHORIZED_REDIRECT_PATH)
    }
  }
  return Promise.reject(camelizeKeys(json))
}

const handleResponse = schema => (response) => {
  if (response.status === 204) {
    // No Content
    return response.statusText
  }
  if (response.status >= 500) {
    // Server Error
    return Promise.reject(response.statusText)
  }

  // Assume JSON response
  return response.json().then((json) => {
    if (!response.ok) {
      return handleError(response, json)
    }

    const camelizedJson = camelizeKeys(json)

    return schema ? normalize(camelizedJson, schema) : camelizedJson
  })
}

const callApi = (url, method, body, schema) => {
  const requestOptions = {
    method,
    body,
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  }

  if (isPlainObject(body)) {
    requestOptions.body = JSON.stringify(decamelizeKeys(body))
    requestOptions.headers['Content-Type'] = 'application/json'
  }

  return fetch(url, requestOptions).then(handleResponse(schema))
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { query, body, types, schema } = callAPI
  let { endpoint, method } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  // If query params are specified, append them to endpoint
  if (typeof query !== 'undefined') {
    if (!isPlainObject(query)) {
      throw new Error('Expected query to be an object.')
    }
    endpoint += '?' + param(decamelizeKeys(omitBy(query, isUndefined)))
  }

  // Build full URL by prepending API server URL
  const apiRoot = url.resolve(store.getState().config.apiUrl, '/api/v1/')
  const fullUrl = (endpoint.indexOf(apiRoot) === -1) ? apiRoot + endpoint : endpoint

  if (typeof method === 'undefined') {
    method = HTTP_METHODS.GET
  } else if (!{}.hasOwnProperty.call(HTTP_METHODS, method)) {
    throw new Error('Invalid HTTP method.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(fullUrl, method, body, schema).then(
    response => Promise.resolve(
      next(actionWith({
          payload: response,
          type: successType,
        }),
      ))
      .then(result => (
        result.payload ? result.payload : result
      )),
    error => Promise.resolve(
      next(actionWith({
          type: failureType,
          error: error || 'Something bad happened',
        }),
      ))
      .then(err => (
        Promise.reject(err.error ? err.error : err)
      )),
  )
}
