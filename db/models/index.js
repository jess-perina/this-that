'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
//const Sequelize = require('sequelize')
const User = require('./user');
const OAuth = require('./oauth');
const Question = require('./question');
const Answer = require('./answer');
//const UserQestionAnswer = require('./userQuestionAnswer')
//moving out timestamps so that we can test the db directly

OAuth.belongsTo(User)
User.hasOne(OAuth)

Answer.belongsTo(User, {as: 'respondent'}); //Answer has method getUser, Answer has foreign key for User 'respondent_id'
Answer.belongsTo(Question); //Question has methods getAnswer, getAnswers, setAnswer, addAnswer, Answer has foreign key for Question

//Changed the line above--does basically the same thing

Question.belongsTo(User, {as: 'owner'}); //Question has method getUser, Question has foreign key for User 'owner_id'

module.exports = {User, Question, Answer}
