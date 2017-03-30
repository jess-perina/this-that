import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import NavActions from '../Redux/NavRedux'

import FriendsActions from '../Redux/FriendsRedux'
import { Actions } from 'react-native-router-flux'

// attempts to login

function * getFriends (api, userId) {
  // make the call to the api
  const response = yield call(api.getFriends, userId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FriendsActions.friendsSuccess(response.data))
  } else {
    yield put(FriendsActions.friendsFailure())
  }
}

export function * login (api, { userNumber, password }) {
  let response = yield call(api.logMeIn, userNumber, password)
  let userName = response.data.name
  let userId = response.data.id

   // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(LoginActions.loginSuccess(userName, userId))
    yield call(getFriends, api, userId)
    yield put(NavActions.changePage('questionForm'))
    Actions.questionForm()
  } else {
    yield put(LoginActions.loginFailure())
  }
}
