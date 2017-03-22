const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
const Promise = require('bluebird')

module.exports = require('express').Router()
// .post('/:userId', (req, res, next) => {
//   let {title, leftText, rightText, publicBool, respondents} = req.body
//   Question.create({title, leftText, rightText, public: publicBool, owner_id: req.params.userId})
//   .then((question) => {
//     return Promise.map(JSON.parse(respondents), (respondent) => {
//       return Answer.create({respondent_id: respondent, question_id: question.id})
//     })
//   })
//   .then(() => res.send(200))
//   .catch(err => console.log(err))
// })
