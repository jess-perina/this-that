

const Sequelize = require('sequelize');
const db = require('APP/db');
const Question = db.model('question');

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
  classMethods:{
    getTenOlderQuestionsAskedMe: function(userId, offset){  //Offset should be the current length of the array
      return this.findAll({
        where: {
          respondent_id: userId
        },
        order: 'id DESC',
        offset: offset,
        limit: 10,
        include: [Question]});
    },
    getNewestQuestionsAskedMe: function(userId, newestAnswerId){
      return this.findAll({
        where: {
          respondent_id: userId,
          id: {$gt: newestAnswerId}
        },
        include: [Question]

      });
    }
  }
});

module.exports = Answer;
