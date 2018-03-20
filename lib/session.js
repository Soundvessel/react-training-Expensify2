const AUTH_HEADERS_KEY = 'auth_headers'
const USER_EMAIL_KEY = 'X-USER-EMAIL'
const USER_TOKEN_KEY = 'X-USER-TOKEN'

export const getAuthHeaders = () => {
  return JSON.parse(localStorage.getItem(AUTH_HEADERS_KEY)) || {}
}

export const setAuthHeaders = (email, token) => {
  const headers = {
    [USER_EMAIL_KEY]: email,
    [USER_TOKEN_KEY]: token,
  }
  localStorage.setItem(AUTH_HEADERS_KEY, JSON.stringify(headers))
}

export const removeAuthHeaders = () => {
  localStorage.removeItem(AUTH_HEADERS_KEY)
}

export const isSignedIn = () => {
  const headers = getAuthHeaders()
  return (
    typeof headers[USER_EMAIL_KEY] === 'string' &&
    typeof headers[USER_TOKEN_KEY] === 'string'
  )
}
