const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
const User = db.model('user' )
const Promise = require('bluebird')
const Sequelize = require('sequelize')

module.exports = require('express').Router()
//Gets all of a user's friends
// .get('/:userId/friends', (req, res, next) => {
//   Friends.findAll({where: {user_id: req.params.userId}, include: [User]})
//   .then((arrOfFriendships) => {
//     //map to userObjects and send off
//   })
//   .catch(next);
// })
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
.put('/:userId/addFriend', (req,res,next)=> {
  console.log(req.body)
  Promise.all([User.findOne({where: {id: req.params.userId}}), User.findOne({where: {id: req.body.friendId}})])
  .then((arrOfUsers) => {
    return Promise.all([arrOfUsers[0].addFriend(arrOfUsers[1]), arrOfUsers[1].addFriend(arrOfUsers[0])]);
  })
  .then((arrOfPromise) => {
    console.log(arrOfPromise[0])
    console.log(arrOfPromise[1])
    res.send(200)
  })
  .catch(next)
})