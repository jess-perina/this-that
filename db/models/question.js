const Sequelize = require('sequelize')
const db = require('APP/db')
const Promise = require('bluebird')
const Answer = require('./answer')
const Question = db.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  leftText: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rightText: {
    type: Sequelize.STRING,
    allowNull: false
  },
  leftImage: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {isURL: true}
  },
  rightImage: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {isURL: true}
  },
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  expires: {
    type: Sequelize.DATE
  },
  leftVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    min: 0// set min to 0
  },
  rightVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    min: 0 // set min to 0
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  instanceMethods: {
    getAnswersPerUser: function () {
      return Promise.map(this.getAnswers(), (answer) => Promise.all([answer, answer.getRespondent()]))
    },
    getAnswerOfUser: function (userId) {
      return Answer.findOne({where: {question_id: this.id, respondent_id: userId }})
    },
    votesQuestionUpdate: function (vote) {
      return this.increment((vote === 'left') ? 'leftVotes' : 'rightVotes', { by: 1 })
    },
    pendingRespondentsIds: function () {
      return Promise.reduce(
        this.getAnswers(),
        (acc, answer) => {
          if (!answer.vote) {
            return (
              answer.getRespondent()
              .then(respondent => respondent.id)
              .then(id => {
                acc.push(id)
                return acc
              })
            )
          } else {
            return acc
          }
        },
        [])
    },
    answeredRespondentsIds: function () {
      return Promise.reduce(
        this.getAnswers(),
        (acc, answer) => {
          if (answer.vote) {
            return (
              answer.getRespondent()
              .then(respondent => respondent.id)
              .then(id => {
                acc.push(id)
                return acc
              })
            )
          } else {
            return acc
          }
        },
        []
      )
    },
    // will split in two soon
    submitAnswer: function (voteRespondent) {
      let {vote, comment, respondentId} = voteRespondent
    //  let voteInstance = Object.assign(voteComposite, { respondent_id: respondentId, question_id: this.id})
      if ((this.active()) && (this.public)) {
        return this.answeredRespondentsIds()
        .then(ids => {
          if (!ids.includes(+respondentId)) {
            Answer.create({vote, comment, respondent_id: respondentId, question_id: this.id})
            .then(() => this.votesQuestionUpdate(vote))
          } else {
            throw Error('attempt for uninvited entry')
          }
        })
      } else if (this.active() && (!this.public)) {
        return this.pendingRespondentsIds()
        .then(ids => {
          if (ids.includes(+respondentId)) {
            this.getAnswerOfUser(respondentId)
            .then(answer => answer.update({comment, vote}))
            .then(() => this.votesQuestionUpdate(vote))
          } else {
            throw Error('attempt for uninvited entry')
          }
        })
      } else {
        throw Error('Submitting to an inactive question')
      }
    },
    active: function () {
      // simplfying for now so that we don't mess with dates
      return (/* (this.expires > new Date()) && */ this.open)
    }
  },
  classMethods: {
    getAllQuestionsByUser: function (userId) {
      return this.findAll({
        where: { owner_id: userId}
      })
    },
    getAllCurrentQuestionsByUser: function (userId) {
      return this.findAll({
        where: { owner_id: userId, expires: {$gte: new Date()}, open: true}
      })
    }
  }
})

module.exports = Question
