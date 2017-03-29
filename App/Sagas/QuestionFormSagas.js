/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import QuestionFormActions from '../Redux/QuestionFormRedux'
import { RNS3 } from 'react-native-aws3'
import options from '../../secret.js'

export function * imageBucket (imageUri) {
  let file = {
    // `uri` can also be a file system path (i.e. file://)
    uri: imageUri,
    name: imageUri.slice(-40, -8) + '.jpg',
    type: 'image/jpg'
  }
  console.log('fileObject', file)
  const response = yield call(RNS3.put, file, options)
  if (response.status !== 201) {
    throw new Error('Failed to upload image to S3')
  }
  return response
}

export function * postQuestion (api, action) {
  const { questionText, leftText, rightText, respondents, leftImage, rightImage, userId } = action
  console.log('postQuestion action log--- ', action)
  // make the call to the api
  let leftImageResponse, leftLocation, rightImageResponse, rightLocation
  try {
    leftImageResponse = yield imageBucket(leftImage)
  } catch (e) {
    console.log(e)
  }
  try {
    rightImageResponse = yield imageBucket(rightImage)
  } catch (e) {
    console.log(e)
  }

  leftLocation = leftImageResponse.headers.Location
  rightLocation = rightImageResponse.headers.Location

  const response = yield call(api.postQuestion, questionText, leftText, rightText, respondents, leftLocation, rightLocation, userId)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(QuestionFormActions.questionSuccess(response.data))
  } else {
    yield put(QuestionFormActions.questionFailure())
  }
}

