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
  hooks: {
    // afterUpdate: function(instance, options){
    //   if(instance.vote === 'left'){
    //     Question.update({where: {
    //       id: instance.question_id
    //     } })
    //   }
    // }
  },
  classMethods: {
    getAllQuestionsToUser: function (userId) {
      return this.findAll({
        where: {respondent_id: userId},
        include: [{model: db.model('question'), where: {expires: {$gte: new Date()}, open: true}}],
        order: [
          ['vote', 'ASC nulls first'],
          ['created_at', 'DESC']
      ]
      })
    },
    getNextQuestionsToUser: function (userId, offset) {  // Offset should be the current length of the array
      return this.findAll({
        where: {
          respondent_id: userId,
          vote: null
        },
        order: 'id DESC',
        offset: offset,
        limit: 10,
        include: [
          { model: db.model('question'), where: {expires: {$gte: new Date()}}}
        ]})
        .then(answers => answers.map(answer => answer.question))
    },
    getNewestQuestionsToUser: function (userId, newestAnswerId) {
      return this.findAll({
        where: {
          respondent_id: userId,
          vote: null,
          id: {$gt: newestAnswerId}
        },
        include: [db.model('question')]
      })
      .then(answers => answers.map(answer => answer.question))
    }
  }
})

module.exports = Answer
