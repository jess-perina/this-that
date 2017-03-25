import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myQuestionsRequest: ['userId'],
  myQuestionsSuccess: ['myQuestions'],
  myQuestionsFailure: null
})

export const MyQuestionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, myQuestionsFromAPI) => {
  const { myQuestions } = myQuestionsFromAPI
  return state.merge({ fetching: false, error: null, myQuestions })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_QUESTIONS_REQUEST]: request,
  [Types.MY_QUESTIONS_SUCCESS]: success,
  [Types.MY_QUESTIONS_FAILURE]: failure
})
