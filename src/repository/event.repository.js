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
 * Get all locations
 * @return	{json} response
 */
EventRepository.prototype.getLocations = async (req, res) => {
	let limit = parseInt(req.query.limit) || 25
	let page = parseInt(req.query.page) || 1
	
	try {
		const offset = (page === 1) ? 0 : (page - 1) * limit;
		const end = offset + limit;
		const locations = EventData.locations;
		const selectedLocations = locations.slice(offset, end)
		
		let pagination = Utils.paginate(locations.length, page, limit)
		
		if (locations.length > 0)
			return res.status(200).json({
				payload: selectedLocations,
				pagination
			})
		return res.status(200).json({
			message: "No locations found in the system.",
			payload: []
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
	let limit = parseInt(req.query.limit) || 25
	let page = parseInt(req.query.page) || 1
	
	try {
		const events = EventData.alarms;
		if (events.length > 0)
			return res.status(200).json({
				payload: events
			})
		return res.status(200).json({
			message: 'No event found in the system.',
			payload: []
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}
