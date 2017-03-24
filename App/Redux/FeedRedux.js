import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestOlderFeed: ['offset'],  //the offset should be the current size of the array
  requestNewestFeed: ['idOfFirstQuestionInFeed'],   //id of the newest question asked to me...after lunch find the exact route that does this
  
  olderFeedSuccess: ['olderQuestions'],
  newestFeedSuccess: ['newestQuestions']
  // feedRequest: ['data'],
  // feedSuccess: ['payload'],
  // feedFailure: null
})

export const FeedTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentFeed: [] //An array of question Instances
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure
})
