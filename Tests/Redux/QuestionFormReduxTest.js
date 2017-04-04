import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/QuestionFormRedux'

test('update', (t) => {
  const field = 'questionText'
  const text = 'This is my question?'
  const state = reducer(INITIAL_STATE, Actions.questionUpdate(field, text))

  t.is(state[field], text)
  t.is(state.questionText, text)
})

test('submit', (t) => {
  const questionText = 'This or that?'
  const leftText = 'This'
  const rightText = 'That'
  const leftImage = 'https://lorempixel.com/400/600/black/left/'
  const rightImage = 'https://lorempixel.com/400/600/black/right/'
  const respondents = ['me', 'my friend', 'my other friend']
  const expirationDate = '3/31/2017'
  const expirationTime = '14:40'
  const isPublic = true
  const state = reducer(INITIAL_STATE, Actions.questionSubmit(questionText, leftText, rightText, leftImage, rightImage, respondents, expirationDate, expirationTime, isPublic))

  t.is(state.questionText, questionText)
  t.is(state.leftText, leftText)
  t.is(state.rightText, rightText)
  t.is(state.leftImage, leftImage)
  t.is(state.rightImage, rightImage)
  t.is(state.respondents[0], respondents[0])
  t.is(state.respondents[1], respondents[1])
  t.is(state.respondents[2], respondents[2])
  t.is(state.expirationDate, expirationDate)
  t.is(state.expirationTime, expirationTime)
  t.is(state.isPublic, isPublic)
})

test('registerRespondents', (t) => {
  const respondents = ['me', 'my friend', 'my other friend']
  const state = reducer(INITIAL_STATE, Actions.questionSetRespondents(respondents))

  t.is(state.respondents[0], respondents[0])
  t.is(state.respondents[1], respondents[1])
  t.is(state.respondents[2], respondents[2])
})

test('setPhotoUri', (t) => {
  const photoUri = 'https://lorempixel.com/400/600/black/test/'
  const state = reducer(INITIAL_STATE, Actions.dispatchPhoto(photoUri))

  t.is(state.photoUri, photoUri)
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
