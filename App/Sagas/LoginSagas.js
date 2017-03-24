import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, { userNumber, password }) {
  let response = yield call(api.logMeIn, userNumber, password)
  let userName = response.data.name
  let userId = response.data.id

  yield put(LoginActions.loginSuccess(userName, userId))
}
