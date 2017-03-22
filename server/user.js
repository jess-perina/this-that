const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
const Promise = require('bluebird')

module.exports = require('express').Router()
.get('/:userId/askedto', (req, res, next) => {
  Answer.getAllQuestionsToUser(req.params.userId)
  .then((answers) => {
    let questions = answers.map(answer => answer.question)
    res.json(questions)
  })
  .catch(next)
})
.get('/:userId/askedby', (req, res, next) => {
  Question.getAllQuestionsByUser(req.params.userId)
  .then((result) => res.json(result))
  .catch(next)
})
.get('/:userId/askedtolimit', (req, res, next) => {
  Answer.getNextQuestionsToUser(req.params.userId, 0)
  .then((myQuestions) => {
    res.json(myQuestions)
  })
})
.post('/:userId/newprivatequestion', (req, res, next) => {
  let {title, leftText, rightText, publicBool, respondents} = req.body
  Question.create({title, leftText, rightText, public: publicBool, owner_id: req.params.userId})
  .then((question) => {
    let participantsAndMe = JSON.parse(respondents).push(req.params.userId)
    return Promise.map(participantsAndMe, (respondent) => {
      return Answer.create({respondent_id: respondent, question_id: question.id})
    })
  })
  .then(() => res.send(200))
  .catch(err => console.log(err))
})
.post('/:userId/newpublicquestion', (req, res, next) => {
  let {title, leftText, rightText} = req.body
  Question.create({title, leftText, rightText, public: true, owner_id: req.params.userId})
  .then(() => res.send(200))
  .catch(err => console.log(err))
})
