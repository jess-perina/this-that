import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: ['userId'],
  feedSuccess: ['payload'],
  feedFailure: null

})

export const FeedTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  feed: [], //Array Of Question Instances
  fetching: null,
  //payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { userId }) =>
  state.merge({ fetching: true, data})

// successful api lookup
export const success = (state, action) => {
  const { feed } = action
  return state.merge({ fetching: false, error: null, feed })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure
})
