/*!
 * User Service
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const User = require('../config/models/users')
const UserService = require('./service')(User)

module.exports = UserService
