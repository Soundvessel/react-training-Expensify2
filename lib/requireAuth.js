/**
 * Created by david.vanoni@coplex.com on 8/23/17.
 *
 * This file exports a function that returns a higher-order component (HOC)
 * when provided a base component.
 * The base component is expected to be a Next.js "page" meaning it provides
 * support for the static `getInitialProps` method which is subsequently
 * called by `withRedux`.
 *
 * During server-side rendering and the first render pass on the client,
 * the HOC renders the Loading component.
 *
 * Upon mounting on the client, the HOC attempts to retrieve the user info
 * from the API using the auth headers stored in the client's local storage.
 *
 * If the request succeeds, `isSignedIn` becomes `true` and the base
 * component is rendered. (See `modules/auth.js` for more details.)
 *
 * If the request fails with a '401 Unauthorized' status, `isSignedIn` remains
 * `false` and the client reroutes to the index page with the sign-in form.
 * (See `middlewares/api.js` for more details.)
 */

import withRedux from 'next-redux-wrapper'
import React from 'react'
import {
  branch,
  compose,
  hoistStatics,
  lifecycle,
  renderComponent,
  setDisplayName
} from 'recompose'
import { createSelector } from 'reselect'
import Loading from '../components/Loading'
import { retrieveUser, selectIsSignedIn } from '../modules/auth'
import initStore from '../store'

const mapStateToProps = createSelector(
  selectIsSignedIn(),
  (isSignedIn) => ({ isSignedIn })
)

const mapDispatchToProps = { retrieveUser }

const authenticatedPageDidMount = function () {
  const { isSignedIn, retrieveUser } = this.props

  if (!isSignedIn) {
    // Attempt to retrieve user info.
    // `iSignedIn` will become `true` if retrieval succeeds.
    retrieveUser()
  }
}

const Placeholder = () => (
  <div>
    <Loading/>
  </div>
)

// Use `hoistStatics` to ensure that wrapped page's `getInitialProps`
// is accessible to `withRedux`.
export default compose(
  withRedux(initStore, mapStateToProps, mapDispatchToProps),
  setDisplayName('AuthenticatedPage'),
  hoistStatics(
    compose(
      lifecycle({
        componentDidMount: authenticatedPageDidMount,
      }),
      branch(
        ({ isSignedIn }) => !isSignedIn,
        renderComponent(Placeholder),
      ),
    )
  )
)
