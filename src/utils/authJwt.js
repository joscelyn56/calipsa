const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

verifyToken = (req, res, next) => {
	const token = req.headers['authorization']
	
	if (!token) {
		return res.status(403).send({
			message: 'Please login to continue using the service.'
		})
	}
	
	if (!token.includes("Bearer")) {
		return res.status(401).send({
			message: 'Authentication Failed.'
		})
	}
	
	const loginToken = token.split(" ")[1];
	
	jwt.verify(loginToken, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Authentication Failed.'
			})
		}
		req.user = decoded.id
		next()
	})
}

const authJwt = {}
authJwt.verifyToken = verifyToken

module.exports = authJwt
