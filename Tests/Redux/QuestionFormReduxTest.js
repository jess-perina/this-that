import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/QuestionFormRedux'

test('submit', (t) => {
  const questionText = 'This or that?'
  const leftText = 'This'
  const rightText = 'That'
  const state = reducer(INITIAL_STATE, Actions.questionSubmit(questionText, leftText, rightText))

  t.is(state.questionText, questionText)
  t.is(state.leftText, leftText)
  t.is(state.rightText, rightText)
})

test('success', (t) => {
  const state = reducer(INITIAL_STATE, Actions.questionSuccess())

  t.false(state.fetching)
  t.is(null, state.error)
})

test('failure', (t) => {
  const state = reducer(INITIAL_STATE, Actions.questionFailure())

  t.false(state.fetching)
  t.true(state.error)
})
