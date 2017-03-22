'use strict'

const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
module.exports = require('express').Router()

.get('/to/:respondent', (req, res, next) => {
  Answer.findAll({
    where: {respondent_id: req.params.respondent, vote: null},
    include: [
      {model: Question, expires: {$gte: new Date()}}
    ]
  })
  .then((answers) => {
    let questions = answers.map(answer => answer.question)
    res.json(questions)
  })
  .catch(next)
})

.get('/to/:respondent/limit', (req, res, next) => {
  Answer.getNextQuestionsToUser(req.params.respondent, 0)
  .then((myQuestions) => {
    res.json(myQuestions)
  })
})
