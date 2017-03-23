'use strict'

const db = require('APP/db')
// for more complex routes if needed
// const Answer = db.model('answer')
// const Question = db.model('question')
const User = db.model('user')

module.exports = require('express').Router()

// get all users or , if a number query is passed in, get those specific users
// FOR QUERIES: Get array of numbers from contact and pass it into query as such: '['+array+']'
// ANYTHING ELSE WILL FAIL...EPICALLY!!!
.get('/', (req, res, next) => {
  if (req.query.numbers) {
    let numbers = req.query.numbers.slice(1, -1).split(',')
    User.verifyFriendsAreMembers(numbers)
    .then((arrOfUsers) => res.json(arrOfUsers))
    .catch(next)
  } else {
    User.findAll({})
    .then(users => res.json(users))
    .catch(next)
  }
})
// get single user by id
.get('/:id', (req, res, next) =>
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(next))

// create new user
.post('/', (req, res, next) =>
  User.create(req.body)
  .then(user => res.status(201).json(user))
  .catch(next))

// update  user by id
.put('/:id', (req, res, next) =>
  User.findById(req.params.id)
  .then(foundUser => foundUser.update(req.body))
  .then(updatedUser => res.json(updatedUser))
  .catch(next))

// remove user by id
.delete('/:id', (req, res, next) =>
  User.findById(req.params.id)
  .then(foundUser => foundUser.destroy())
  .then(() => res.status(204).end())
  .catch(next))
