/*!
 * Authentication Api
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
var express = require('express')
var router = express.Router()

/**
 * Middlewares
 * @private
 */
const {
	accountExists,
	isRegistered,
} = require('../middleware/auth.middleware')
const {
	validateSignup,
	validateSignin,
} = require('../validation/auth.validation')

/**
 * Repositories
 * @private
 */
const Auth = require('../repository/user.repository')

/**
 * Module exports
 * @public
 */
module.exports = router

/**
 * Authentication routes
 */
router.post('/signup', [validateSignup, accountExists], Auth.signup)
router.post('/signin', [validateSignin, isRegistered], Auth.signin)
