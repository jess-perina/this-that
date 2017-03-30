import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  friendsRequest: ['userId'],
  friendsSuccess: ['payload'],
  friendsFailure: null

})

export const FriendsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  friends: [], // Array Of Question Instances
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { userId }) =>
  state.merge({fetching: true, userId})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, friends: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FRIENDS_REQUEST]: request,
  [Types.FRIENDS_SUCCESS]: success,
  [Types.FRIENDS_FAILURE]: failure
})
