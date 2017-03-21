'use strict'; // eslint-disable-line semi

const app = require('APP')
const {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router() // eslint-disable-line new-cap

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

// require.('passport-local').Strategy => a function we can use as a constructor, that takes in a callback
const LocalStrategy = require('passport-local').Strategy

passport.use('local-login', new LocalStrategy(
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, {message: 'Login incorrect'})
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')
              return done(null, false, {message: 'Login incorrect'})
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

passport.use('local-signup', new LocalStrategy(
  (info, password, done) => {
    let [name, email] = info.split('__')
    debug('will check uniqueness of (email: "%s")', email)
    User.findOrCreate({where: {email}, defaults: {name, password}})
      .spread((user, created) => {
        if (!created) {
          debug('user (email: "%s") did fail: a user with the same email already exists', email)
          return done(null, false, {message: 'Invalid sign up email'})
        }
        return done(null, user)
      })
      .catch(done)
  }))

// asynchronous

auth.get('/whoami', (req, res) => res.send(req.user))

// POST requests for local login:
auth.post('/login/local', passport.authenticate('local-login', {successRedirect: '/'}))

// POST requests for local signUp:
auth.post('/signup/local', passport.authenticate('local-signup', {successRedirect: '/'}))

// Google authentication and login
// auth.get('/google', passport.authenticate('google', {scope: 'email'}));
//
//
// auth.get('/login/:strategy', (req, res, next) =>
//   passport.authenticate(req.params.strategy, {
//     scope: 'email',
//     successRedirect: '/',
//     failureRedirect: '/'
//   // Specify other config here, such as "scope"
//   })(req, res, next)
// )
// auth.get('/signup/:strategy', (req, res, next) =>

auth.get('/signup/:strategy', (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    scope: 'email',
    successRedirect: '/'
    // Specify other config here, such as "scope"
  })(req, res, next))

auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
