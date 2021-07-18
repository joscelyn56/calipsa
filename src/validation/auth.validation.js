/*!
 * Authentication Validation
 */

'use strict'

/**
 * Module exports
 * @public
 */
module.exports.validateSignup = validateSignup
module.exports.validateSignin = validateSignin

/**
 * @function
 * Validate signup request
 */
async function validateSignup(req, res, next) {
	try {
		let errors = {}
		
		if (!req.body.hasOwnProperty('name') || req.body.name === '') {
			errors['name'] = 'Please enter name'
		}
		if (!req.body.hasOwnProperty('email') || req.body.email === '') {
			errors['email'] = 'Please enter a valid email'
		}
		if (!req.body.hasOwnProperty('password') || req.body.password === '') {
			errors['password'] = 'Please enter password'
		}
		if (Object.keys(errors).length > 0) {
			return res.status(200).json({
				error: true,
				errors: errors
			})
		}
		next()
	} catch (error) {
		console.log(error)
	}
}

/**
 * @function
 * Validate signin request
 */
async function validateSignin(req, res, next) {
	try {
		let errors = {}
		
		if (!req.body.hasOwnProperty('email') || req.body.email === '') {
			errors['email'] = 'Please enter a valid email'
		}
		if (!req.body.hasOwnProperty('password') || req.body.password === '') {
			errors['password'] = 'Please enter a valid password'
		}
		if (Object.keys(errors).length > 0) {
			return res.status(200).json({
				error: true,
				errors: errors
			})
		}
		next()
	} catch (error) {
		console.log(error)
	}
}
