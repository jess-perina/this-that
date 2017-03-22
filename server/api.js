'use strict'; // eslint-disable-line semi

require('APP/db')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
<<<<<<< HEAD
  .use('/user', require('./user'))
=======
  .use('/feed', require('./feed'))
>>>>>>> 4f68863a11eab5e04876714741623290118e9df9
  .use('/question', require('./question'))
  .use('/users', require('./users'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
