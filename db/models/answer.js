

const Sequelize = require('sequelize')
const db = require('APP/db')

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
})

module.exports = Answer
