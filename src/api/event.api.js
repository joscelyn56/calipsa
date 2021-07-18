/*!
 * Events Api
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const express = require('express'),
    router = express.Router()

/**
 * Middlewares
 * @private
 */
const authJwt = require('./../utils/authJwt')

/**
 * Repositories
 * @private 
 */
const Event = require('../repository/event.repository')

/**
 * Module exports
 * @public 
 */
module.exports = router

/**
 * Rider Event routes
 */
router.get('/events', authJwt.verifyToken, Event.getEvents)
router.get('/locations', authJwt.verifyToken, Event.getLocations)
