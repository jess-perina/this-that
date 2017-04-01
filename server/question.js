const db = require('APP/db')
const Question = db.model('question')
// const Answer = db.model('answer');
const Promise = require('bluebird')

module.exports = require('express').Router()
.get('/:questionId', (req, res, next) => {
  Question.findOne({where: {id: req.params.questionId}})
  .then(question => (Promise.all([question, question.getAnswersPerUser(), question.getOwner()])))
  .then(([question, answers, owner]) => res.send({question, answersPerUser: answers, owner}))
  .catch(err => console.log(err))
})
.post('/:questionId', (req, res, next) => {
  // expecting json of the form {vote: , comment:  ,respondentId: } as req.body
  Question.findOne({where: {id: req.params.questionId}})
  .then(question => question.submitAnswer(req.body))
  .then(() => res.sendStatus(200))
  .catch(err => { console.log(err); res.sendStatus(500) })
})
