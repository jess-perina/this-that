const db = require('APP/db')

const seedUsers = () => db.model('user').create(
  {name: 'Jess', phoneNumber: '1234567890', password: '1234'})
  .then(() => db.model('user').create(
  {name: 'Jacquin', phoneNumber: '1234567891', password: '1234'}))
  .then(() => db.model('user').create(
  {name: 'Konst', phoneNumber: '1234567892', password: '1234'}))
  .then(() => db.model('user').create(
  {name: 'Ian', phoneNumber: '1234567893', password: '1234'}))
  .then(() => db.model('user').create(
  {name: 'Stranger', phoneNumber: '1234567894', password: '1234'}))
  .then(() => db.model('user').findAll())

const seedQuestions = () => db.model('question').bulkCreate([
  {title: 'Jess and Jacquin, what do you think?', leftText: 'Nikes', rightText: 'Reeboks', expires: '2017-04-07 11:00:00-04', public: false, owner_id: 4},
  {title: 'Random internet people, please advise:', leftText: 'Red tie', rightText: 'Blue tie', expires: '2017-04-07 11:00:00-04', rightVotes: 1, public: true, owner_id: 5},
  {title: 'What should I make for dinner?', leftText: 'Tacos', rightText: 'Turducken', expires: '2017-04-07 11:00:00-04', leftVotes: 1, rightVotes: 1, public: false, owner_id: 1}
])

const seedAnswers = () => db.model('answer').bulkCreate([
  {respondent_id: 1, question_id: 1},
  {respondent_id: 2, question_id: 1},
  {vote: 'right', comment: 'Blue looks good on you', respondent_id: 4, question_id: 2},
  {vote: 'right', comment: 'Turducken hell yeah', respondent_id: 2, question_id: 3},
  {vote: 'left', comment: 'Jacquin you\'re nuts', respondent_id: 3, question_id: 3},
  {respondent_id: 4, question_id: 3}

])

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedQuestions)
  .then(questions => console.log(`Seeded ${questions.length} questions OK`))
  .then(seedAnswers)
  .then(answers => console.log(`Seeded ${answers.length} answers OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
