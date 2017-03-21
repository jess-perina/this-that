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
<<<<<<< HEAD
    defaultValue: 0,
    min: 0// set min to 0
  },
  rightVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    min: 0 // set min to 0
=======
    defaultValue: 0 // set min to 0
  },
  rightVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0 // set min to 0
>>>>>>> 378700bed34f0a16bdd4ee469fc229a276deffdf
  },
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

module.exports = Question
