
const Sequelize = require('sequelize')
const db = require('APP/db')
const Question = require('./question')
const Answer = db.define('answer', {
  vote: {
    type: Sequelize.ENUM('left', 'right')
  },
  comment: {
    type: Sequelize.TEXT
  },
  videoComment: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {isUrl: true}
  }
}, {
  classMethods: {
    getAllQuestionsToUser: function (userId) {
      return this.findAll({
        where: {respondent_id: userId, vote: null},
        include: [
          { model: Question, expires: {$gte: new Date()}, open: true}
        ]
      })
    },
    getNextQuestionsToUser: function (userId, offset = 0) {  // Offset should be the current length of the array
      return this.findAll({
        where: {
          respondent_id: userId,
          vote: null
        },
        order: 'id DESC',
        offset: offset,
        limit: 10,
        include: [
          { model: Question, expires: {$gte: new Date()}}
        ]})
        .then(answers => answers.map(answer => answer.question))
    },
    getNewestQuestionsAskedMe: function (userId, newestAnswerId) {
      return this.findAll({
        where: {
          respondent_id: userId,
          vote: null,
          id: {$gt: newestAnswerId}
        },
        include: [Question]
      })
    }
  }
})

module.exports = Answer
