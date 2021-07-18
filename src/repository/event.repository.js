/*!
 * Event Repository
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const Utils = require('../utils/utils')
const Logger = require('../utils/logger')
const EventData = require('./../../public/data.1626170682.json')

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
	let search = req.query.search
	
	try {
		const offset = (page === 1) ? 0 : (page - 1) * limit
		const end = offset + limit
		
		let locations = EventData.locations
		if (search) locations = locations.filter(location => location.name.toLowerCase().includes(search.toLowerCase()))
		const selectedLocations = locations.slice(offset, end)
		
		let pagination = Utils.paginate(locations.length, page, limit)
		
		await Logger.append(req)
		
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
	let location = req.query.location
	let outcome = req.query.outcome
	let start_time = req.query.start_time
	let end_time = req.query.end_time
	
	try {
		const offset = (page === 1) ? 0 : (page - 1) * limit
		const end = offset + limit
		
		let events = EventData.alarms
		
		if (location) events = events.filter(event => event.location == location)
		if (outcome) {
			events = events.filter(event => {
				if (outcome === "true")
					return event.outcome === true
				if (outcome === "false")
					return event.outcome === false
			})
		}
		if (start_time) {
			let startDateTime = new Date(start_time)
			
			events = events.filter(event => {
				const eventDateTime = new Date(event.timestamp)
				return eventDateTime >= startDateTime
			})
		}
		if (end_time) {
			let endDateTime = new Date(end_time)
			
			events = events.filter(event => {
				const eventDateTime = new Date(event.timestamp)
				return eventDateTime <= endDateTime
			})
		}
		
		const selectedEvents = events.slice(offset, end)
		
		let pagination = Utils.paginate(events.length, page, limit)
		
		await Logger.append(req)
		
		if (events.length > 0)
			return res.status(200).json({
				payload: selectedEvents,
				pagination
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
