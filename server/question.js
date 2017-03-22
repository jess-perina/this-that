const db = require('APP/db')
const Question = db.model('question')
const Promise = require('bluebird')
module.exports = require('express').Router()
.get('/:questionId', (req, res, next) => {
  Question.findOne({where: {id: req.params.questionId}})
  .then(question => (Promise.all([question, question.getAnswersPerUser()])))
  .then(([question, answers]) => res.send({question, answersPerUser: answers}))
  .catch(err => console.log(err))
})
.post('/:questionId', (req, res, next) => {
  // expecting json of the form {voteComposite: {vote: , comment: }, respondentId: userId}
  //
  let voteComposite = req.body.voteComposite
  let respondentId = req.body.respondentId
  Question.findOne({where: {question_id: req.params.questionId}})
  .then(question => question.submitAnswer(voteComposite, respondentId))
})
