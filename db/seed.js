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

const seedFriends = () => db.model('friendship').bulkCreate([
    {user_id: 1, friend_id: 2},
    {user_id: 1, friend_id: 3},
    {user_id: 1, friend_id: 4},
    {user_id: 2, friend_id: 1},
    {user_id: 2, friend_id: 3},
    {user_id: 2, friend_id: 4},
    {user_id: 3, friend_id: 1},
    {user_id: 3, friend_id: 2},
    {user_id: 3, friend_id: 4},
    {user_id: 4, friend_id: 1},
    {user_id: 4, friend_id: 2},
    {user_id: 4, friend_id: 3}
])

const seedQuestions = () => db.model('question').bulkCreate([
  {title: 'What should I make for dinner?', leftText: 'Chicken', rightText: 'Tacos', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/B45D26FE-C298-4469-8C29-97BE235D.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/4D0737CF-C7F6-47E1-ACA2-ECBC34F6.jpg', expires: '2017-04-07 11:00:00-04', leftVotes: 1, rightVotes: 1, public: false, owner_id: 1},
  {title: 'What should I do this weekend?', leftText: 'Go for a hike', rightText: 'Clean my apartment', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/EA1B961F-1D24-452B-B52F-01F359DD.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/7A3938C7-63DB-46A4-A4C1-D53382DB.jpg', expires: '2017-04-07 11:00:00-04', leftVotes: 1, rightVotes: 1, public: false, owner_id: 1},
  {title: 'Which fly kicks should I buy?', leftText: 'Nikes', rightText: 'Reeboks', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/9898A8EB-D442-4CA6-AE74-D96FED0D.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/E5D79CC2-4993-4D68-9195-EF06BCB1.jpg', expires: '2017-04-07 11:00:00-04', leftVotes: 1, rightVotes: 2, public: false, owner_id: 2},
  {title: 'What should I put on next?', leftText: 'Hurf', rightText: 'Stones', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/F0C8BEB9-FD16-4E9A-BF01-DB3E0012.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/645FDFB0-730B-4D01-A2DE-58CC5DCA.jpg', expires: '2017-04-07 11:00:00-04', public: false, owner_id: 5},
  {title: 'Should I keep growing my beard?', leftText: 'Yes', rightText: 'No', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/64272681-262E-42C0-9778-5EB8761D.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/D5082439-D2D9-42FC-A770-66A7B5FF.jpg', expires: '2017-04-07 11:00:00-04', public: false, owner_id: 4},
  {title: 'Random internet people, please advise:', leftText: 'This tie', rightText: 'That tie', leftImage: 'https://thisthatfullstack.s3.amazonaws.com/7EFB62C3-087A-4574-8D5D-A8695A67.jpg', rightImage: 'https://thisthatfullstack.s3.amazonaws.com/CC634BB9-ADAA-48C8-B188-81172C57.jpg', expires: '2017-04-07 11:00:00-04', leftVotes: 1, public: true, owner_id: 5}
])

const seedAnswers = () => db.model('answer').bulkCreate([
  {vote: 'left', comment: 'Save me a wing', respondent_id: 2, question_id: 1},
  {vote: 'right', comment: 'I\'ll bring the Modelos', respondent_id: 3, question_id: 1},
  {respondent_id: 4, question_id: 1},
  {respondent_id: 2, question_id: 2},
  {vote: 'left', comment: 'Get out of town!', respondent_id: 3, question_id: 2},
  {vote: 'right', comment: 'I dunno, that looks urgent', respondent_id: 4, question_id: 2},
  {vote: 'right', respondent_id: 1, question_id: 3},
  {vote: 'right', respondent_id: 3, question_id: 3},
  {vote: 'left', respondent_id: 4, question_id: 3},
  {respondent_id: 1, question_id: 5},
  {respondent_id: 2, question_id: 5},
  {respondent_id: 3, question_id: 5}

])

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedFriends)
  .then(friends => console.log(`Seeded ${friends.length} friendships OK`))
  .then(seedQuestions)
  .then(questions => console.log(`Seeded ${questions.length} questions OK`))
  .then(seedAnswers)
  .then(answers => console.log(`Seeded ${answers.length} answers OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
