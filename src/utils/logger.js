/*!
 * Utilities
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const fs = require('fs')

/**
 * Module exports
 * @public
 */
module.exports.append = append

/**
 * @function
 * Log activity
 * @param request
 */
async function append(request) {
	let url = request.protocol + '://' + request.get('host') + request.originalUrl
	let description = new Date() + ": " + url + " - user " + request.user
	fs.appendFile("log.txt", description + "\r\n", function (err) {
		if (err) {
			console.log("Logging failed")
		}
		console.log(description)
	})
}
