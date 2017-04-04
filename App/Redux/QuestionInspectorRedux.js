import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  questionInspectorRequest: ['questionId'],
  questionInspectorSuccess: ['question'],
  questionInspectorFailure: null

})

export const QuestionInspectorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  questionId: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { questionId }) =>
  state.merge({ fetching: true, questionId: questionId, payload: null })

// successful api lookup
export const success = (state, action) => {
  console.log('ACTION SUCCESS', action)
  const { question} = action
  return state.merge({ fetching: false, error: null, payload: question, questionId: question.question.id })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QUESTION_INSPECTOR_SUCCESS]: success,
  [Types.QUESTION_INSPECTOR_REQUEST]: request,
  [Types.QUESTION_INSPECTOR_FAILURE]: failure
})
