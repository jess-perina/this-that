import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { username, password }) {
  let response = yield call(api.logMeIn, username, password)
  let userName = response.data.name
  let userId = response.data.id
  // if (password === '') {
    // dispatch failure
    // yield put(LoginActions.loginFailure('WRONG'))
  // } else {
    // dispatch successful logins

  yield put(LoginActions.loginSuccess(userName, userId))

  // }
}
