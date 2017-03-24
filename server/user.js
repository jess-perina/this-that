const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
const Promise = require('bluebird')
const Sequelize = require('sequelize')

module.exports = require('express').Router()
//Returns all questions to a user--ROUTE FOR ADMINS ONLY
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


//Loads the next 20 questions to user
.get('/:userId/askedtolimit/:offset', (req, res, next) => {
  Answer.getNextQuestionsToUser(req.params.userId, req.params.offset)
  .then((myQuestions) => {
    res.json(myQuestions)
  })
  .catch(next)
})

//Gets any new questions asked to user since last load based on the last loads most recently asked question
.get('/:userId/askedtonew/:latestQuestionId', (req,res,next) => {
  Answer.findOne({where: {respondent_id: req.params.userId}, question_id: req.params.latestQuestionId })
  .then((answerInstance) => {
    return Answer.getNewestQuestionsToUser(req.params.userId, answerInstance.id)
  })
  .then((arrOfNewestQuestionAnswers) => res.json(arrOfNewestQuestionAnswers))
  .catch(next)
})


.get('/:userId/random', (req, res, next) => {
  Answer.findAll({where: { respondent_id: req.params.userId} })
  .then((arrOfUserAnswers) => {
    const arrAnsweredQIds = arrOfUserAnswers.map((answer) => (answer.question_id))
    return Question.findAll({
      where: {
        public: true,
        open: true,
        id: {$notIn: arrAnsweredQIds}
      },
      order: [[Sequelize.fn('RANDOM')]],
      limit: 1
    })
  })
  .then((arrOfSingleAnswer) => {
    res.json(arrOfSingleAnswer[0])
  })
  .catch(next)
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
