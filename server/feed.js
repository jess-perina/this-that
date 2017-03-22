'use strict'

const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
module.exports = require('express').Router()
.get('/to/:respondent/limit', (req, res, next) => {
  Answer.getNextQuestionsToUser(req.params.respondent, 0)
  .then((myQuestions) => {
    res.json(myQuestions)
  })
})
