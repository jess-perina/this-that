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
    voteUpdate: function (vote) {
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
              .then(id => acc.push(id))
            )
          }
        },
        []
      )
    },
    anweredRespondentsIds: function () {
      return Promise.reduce(
        this.getAnswers(),
        (acc, answer) => {
          if (answer.vote) {
            return (
              answer.getRespondent()
              .then(respondent => respondent.id)
              .then(id => acc.push(id))
            )
          }
        },
        []
      )
    },
    // will split in two soon
    submitAnswer: function (voteComposite, respondentId) {
      let voteInstance = Object.assign(voteComposite, { respondent_id: respondentId, question_id: this.id})
      if ((this.active()) && (this.public)) {
        this.anweredRespondentsIds()
          .then(ids => {
            if (!ids.includes(respondentId)) {
              Answer.create(voteInstance)
                .then((answer) => {
                  this.voteUpdate(voteInstance.vote)
                  return answer
                })
            }
          })
          .catch(err => console.log(err))
      }
      if (this.active() && (!this.public)) {
        this.pendingRespondentsIds()
          .then(ids => {
            if (!ids.includes(respondentId)) {
              this.voteUpdate(voteInstance.vote)
            }
          })
          .catch(err => console.log(err))
      }
    },
    active: function () {
      return ((this.expires > new Date()) && this.open)
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
