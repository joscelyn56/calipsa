/*!
 * Utilities
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const bcrypt = require('bcrypt')

/**
 * Module exports
 * @public
 */
module.exports.isValid = isValid
module.exports.getDate = getDate
module.exports.hashString = hashString
module.exports.compareHashedString = compareHashedString
module.exports.getDateOnlyAsString = getDateOnlyAsString
module.exports.getTimeOnlyAsString = getTimeOnlyAsString
module.exports.paginate = paginate


/**
 * @function
 * Check if an object is valid
 * @param {{}} response
 * @returns {boolean}
 */
function isValid(response) {
	return (Object.keys(response).length !== 0 && response.constructor === Object)
}

/**
 * @function
 * Get current date and time
 * @returns {date}
 */
function getDate() {
	let date = new Date()
	return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
}

/**
 * @function
 * Get current date as string
 * @returns {date}
 */
function getDateOnlyAsString(date) {
	let month_value = (parseInt(date.getMonth()) + 1)
	let month = (month_value < 10) ? "0" + month_value : month_value
	
	let day_value = (parseInt(date.getDate()))
	let day = (day_value < 10) ? "0" + day_value : day_value
	
	return date.getFullYear() + "-" + month + "-" + day
}

/**
 * @function
 * Get current time as string
 * @returns {date}
 */
function getTimeOnlyAsString(date) {
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

/**
 * @function
 * Encrypt string data
 * @param {string} data
 * @returns {string} hashed string
 */
function hashString(data) {
	return bcrypt.hashSync(data, 10)
}

/**
 * @function
 * Compare encrypted string with another string
 * @param {string} data
 * @param {string} hash
 * @returns {boolean}
 */
function compareHashedString(data, hash) {
	return (bcrypt.compareSync(data, hash)) ? true : false
}

function paginate(total, page, limit) {
	let next_page = page + 1
	let prev_page = (page > 1) ? page - 1 : page
	let total_pages = Math.ceil(total / limit)
	if (next_page > total_pages) next_page = total_pages
	let offset = (page === 1) ? 0 : (page - 1) * limit
	
	return {
		offset,
		limit,
		current_page: page,
		next_page,
		prev_page,
		total_pages
	}
}
