const db = require('APP/db')
const Answer = db.model('answer')
const Question = db.model('question')
const User = db.model('user')
const Promise = require('bluebird')
const Sequelize = require('sequelize')

module.exports = require('express').Router()

// Gets all of a user's friends RETURNS AN ARRAY OF FRIENDS
.get('/:userId/friends', (req, res, next) => {
  // Gets the user instance
  User.findOne({where: {id: req.params.userId}})
  .then((userInstance) => {
    // Passes an array of the Users friends
    return userInstance.getFriend()
  })
  .then((friends) => {
    // Gets the friend objects from the query
    let friendsLight = friends.map(friend => ({friendId: friend.id, userName: friend.name}))
    res.json(friendsLight)
  })
  .catch(next)
})

// Returns all questions to a user--ROUTE FOR ADMINS ONLY
.get('/:userId/askedto', (req, res, next) => {
  Answer.getAllQuestionsToUser(req.params.userId)
  .then((answers) => {
    let questions = answers.map(answer => {
      let question = answer.question
      question.dataValues.myVote = answer.dataValues.vote
      return question
    })
    res.json(questions)
  })
  .catch(next)
})

.get('/:userId/askedby', (req, res, next) => {
  Question.getAllQuestionsByUser(req.params.userId)
  .then((result) => res.json(result))
  .catch(next)
})

// Loads the next 20 questions to user
.get('/:userId/askedtolimit/:offset', (req, res, next) => {
  Answer.getNextQuestionsToUser(req.params.userId, req.params.offset)
  .then((myQuestions) => {
    res.json(myQuestions)
  })
  .catch(next)
})

// Gets any new questions asked to user since last load based on the last loads most recently asked question
.get('/:userId/askedtonew/:latestQuestionId', (req, res, next) => {
  Answer.findOne({where: {respondent_id: req.params.userId}, question_id: req.params.latestQuestionId})
  .then((answerInstance) => {
    return Answer.getNewestQuestionsToUser(req.params.userId, answerInstance.id)
  })
  .then((arrOfNewestQuestionAnswers) => res.json(arrOfNewestQuestionAnswers))
  .catch(next)
})

.get('/:userId/random', (req, res, next) => {
  Answer.findAll({where: {respondent_id: req.params.userId}})
  .then((arrOfUserAnswers) => {
    const arrAnsweredQIds = arrOfUserAnswers.map((answer) => (answer.question_id))
    return Question.findAll({
      where: {
        public: true,
        //  expires: {$gte: new Date()},
        open: true,
        id: {$notIn: arrAnsweredQIds}
      },
      include: [{model: db.model('user'), as: 'owner'}],
      order: [[Sequelize.fn('RANDOM')]],
      limit: 1
    })
  })
  .then((arrOfSingleAnswer) => {
    res.json(arrOfSingleAnswer)
  })
  .catch(next)
})

.post('/:userId/newprivatequestion', (req, res, next) => {
  let {title, leftText, rightText, leftImage, rightImage, publicBool, respondents} = req.body
  Question.create({title, leftText, rightText, leftImage, rightImage, public: publicBool, owner_id: req.params.userId})
  .then((question) => {
    let participantsAndMe = JSON.parse(respondents)
    // participantsAndMe.push(req.params.userId)

    if (participantsAndMe.length) {
      return Promise.map(participantsAndMe, (respondent) => {
        return Answer.create({respondent_id: respondent, question_id: question.id})
      })
    } else {
      throw Error('Created an empty private Question: hope you are planning to fill it up')
    }
  })
  .then(() => res.send(200))
  .catch(err => console.log(err))
})

.post('/:userId/newpublicquestion', (req, res, next) => {
  // adding poller in pollees so that we can easily close a question
  let {title, leftText, rightText} = req.body
  Question.create({title, leftText, rightText, public: true, owner_id: req.params.userId})
  .then(question => Answer.create({respondent_id: req.params.userId, question_id: question.id}))
  .then(() => res.send(200))
  .catch(err => console.log(err))
})

// The below requires a friend's (who is a member) id to work. To get the id,
// the GET /users/[phoneNumbers here] route should be used to grab a list of all possible friends and their ids
.put('/:userId/addFriend', (req, res, next) => {
  // This finds returns an array of 2 User instances: currentUser and friendUser
  Promise.all([User.findOne({where: {id: req.params.userId}}), User.findOne({where: {id: req.body.friendId}})])
  .then((arrOfUsers) => {
    // Makes both user instances friends with each other in the join table
    return Promise.all([arrOfUsers[0].addFriend(arrOfUsers[1]), arrOfUsers[1].addFriend(arrOfUsers[0])])
  })
  .then((arrOfPromise) => {
    // sends status that friendship was accepted
    res.status(200).send()
  })
  .catch(next)
})
