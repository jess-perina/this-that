const Sequelize = require('sequelize')
const db = require('APP/db')

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
  expires: {
    type: Sequelize.DATE
  },
  leftVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // set min to 0
  },
  rightVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // set min to 0
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

module.exports = Question
