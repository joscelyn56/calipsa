/*!
 * Authentication Middleware
 */

'use strict'

/**
 * Module dependencies
 * @private
 */
const AuthRepo = require('../repository/user.repository')

/**
 * Module exports
 * @public
 */
module.exports.accountExists = accountExists
module.exports.isRegistered = isRegistered

/**
 * @function
 * Check if user exist with similar details
 */
async function accountExists(req, res, next) {
	try {
		let email = req.body.email
		let response = await AuthRepo.accountExists(email)
		if (response) {
			return res.status(200).json({
				error: true,
				msg: 'Email is associated with another account.'
			})
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

/**
 * @function
 * Check if user account does not exist
 */
async function isRegistered(req, res, next) {
	try {
		let email = req.body.email
		let response = await AuthRepo.accountExists(email)
		if (!response) {
			return res.status(200).json({
				error: true,
				msg: 'Account does not exist.'
			})
		}
		next()
	} catch (error) {
		console.log(error)
	}
}
