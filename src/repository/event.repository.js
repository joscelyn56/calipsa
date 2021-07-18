/*!
 * Event Repository
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const Utils = require('../utils/utils')
const Users = require('./../services/user.service')
const EventData = require('./../../public/data.1626170682.json');

/**
 * Module exports
 * @public
 */
module.exports = new EventRepository()

/**
 * @class EventRepository
 * Create a new Event instance
 */
function EventRepository() {
}

/**
 * @memberof EventRepository
 * @instance
 * Get all location
 * @return	{json} response
 */
EventRepository.prototype.getLocations = async (req, res) => {
	try {
		const locations = EventData.locations;
		return res.status(200).json({
			message: "No locations found in the system.",
			payload: locations
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}

/**
 * @memberof EventRepository
 * @instance
 * Get events
 * @param   {string} location location id
 * @return	{json} response
 */
EventRepository.prototype.getEvents = async (req, res) => {
	try {
		const events = EventData.alarms;
		res.status(200).json({
			message: 'No event found in the system.',
			payload: events
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}
