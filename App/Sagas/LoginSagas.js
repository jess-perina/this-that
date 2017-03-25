import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { userNumber, password }) {
  let response = yield call(api.logMeIn, userNumber, password)
  let userName = response.data.name
  let userId = response.data.id

   // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(userName, userId))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
