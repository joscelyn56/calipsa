/*!
 * Authentication Repository
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const Utils = require('../utils/utils')
const Users = require('./../services/user.service')

/**
 * Module exports
 * @public
 */
module.exports = new AuthRepository()

/**
 * @class AuthRepository
 * Create a new Authentication instance
 */
function AuthRepository() {
}

/**
 * @memberof AuthRepository
 * @instance
 * Registers new user
 *
 * @method POST
 * @param   {string} name
 * @param   {string} email
 * @param   {string} password
 *
 * @return	{json} response
 */
AuthRepository.prototype.signup = async (req, res) => {
	let name = req.body.name
	let email = req.body.email
	let password = req.body.password
	
	try {
		let today = await Utils.getDate()
		let hashedPassword = Utils.hashString(password)
		
		const user = await Users.add({
			name,
			email,
			password: hashedPassword,
			register_date: today,
		})
		
		if (user)
			return res.status(200).json({
				message: 'Sign up successful.',
			})
		return res.status(400).json({
			message: 'Error signing up new user.'
		})
	} catch (err) {
		console.error(err)
	}
}

/**
 * @memberof AuthRepository
 * @instance
 * Sign in
 *
 * @method POST
 * @param   {string}    email
 * @param   {string}    password
 *
 * @return	{json} response
 */
AuthRepository.prototype.signin = async (req, res) => {
	let email = req.body.email
	let password = req.body.password
	
	try {
		const user = await Users.getOne({
			email
		})
		let user_password = user.password
		if (Utils.compareHashedString(password, user_password)) {
			user.last_login = Utils.getDate()
			user.save()
			
			let token = jwt.sign({
				id: user._id
			}, config.secret, {
				expiresIn: 86400 // expires in 24 hours
			})
			
			return res.status(200).json({
				token: token,
				message: 'Login successful.'
			})
		}
		return res.status(400).json({
			message: 'Incorrect Login Details.'
		})
	} catch (err) {
		console.error(err)
	}
}

/**
 * @memberof AuthRepository
 * @instance
 * Check if an account exists
 * @param   {string} email user email
 * @return	{boolean} response
 */
AuthRepository.prototype.accountExists = async email => {
	try {
		let response = {}
		const user = await Users.getOne({
			email,
		}, ['email'])
		if (user)
			response = Object.assign({}, user)
		return Utils.isValid(response)
	} catch (err) {
		console.error(err)
		throw err
	}
}
