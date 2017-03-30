// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://socketsynth.ngrok.io/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})

  const postQuestion = (question, left, right, respondents, leftImage, rightImage, userId) => {
    respondents = `[${respondents.toString()}]`
    return api.post(`api/user/${userId}/newprivatequestion`, {title: question, leftText: left, rightText: right, respondents: respondents, leftImage: leftImage, rightImage: rightImage, userId: userId})
  }

  const logMeIn = (username, password) => {
    return api.post('api/auth/login/local', {username: username, password: password})
  }
  const getMyQuestions = (userID) => {
    let myQresponse = api.get(`api/user/${userID}/askedby`)
    return myQresponse
  }
  const getQuestion = (questionId) => {
    console.log('HIT', questionId)
    return api.get(`api/question/${questionId}`)
  }
  const grabFeed = (userId) => {
    let gottenQuestion = api.get(`api/user/${userId}/askedto`)
    return gottenQuestion
  }

  const getFriends = (userId) => {
    return api.get(`api/user/${userId}/friends`)
  }
  // will also need respondents and proper userId

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    postQuestion,
    logMeIn,
    getMyQuestions,
    getQuestion,
    grabFeed,
    getFriends
  }
}

// let's return back our create method as the default.
export default {
  create
}
