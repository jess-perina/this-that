'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('user', {
  name: Sequelize.STRING,
  phoneNumber: {
    type: Sequelize.STRING(10),
    validate: {
      isNumeric: true,
      notEmpty: true
    }
    // email: {
    // type: Sequelize.STRING,
    // validate: {
    //  isEmail: true,
    //  notEmpty: true,
    // }
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['phoneNumber'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
  classMethods: {
    verifyFriendsAreMembers: function (arrOfPhoneNumbers) {
      return this.findAll({
        where: {
          phoneNumber: {$in: arrOfPhoneNumbers}
        }})
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) => {
            console.log(result)
            err ? reject(err) : resolve(result)
          })

        )
    }
  }
})
function setEmailAndPassword (user) {
//  user.phoneNumber = user.phoneNumber && user.phoneNumber.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}

module.exports = User
