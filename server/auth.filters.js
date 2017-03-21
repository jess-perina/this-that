'use strict'; // eslint-disable-line semi

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id.toString()) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const mustBeAdmin = (req, res, next) => {
  if ((!req.user) || (!req.user.isAdmin)) {
    res.status(403).send('Unauthorized User')
  }
  next()
}
const forbidden = message => (req, res, next) => {
  res.status(403).send(message)
}
