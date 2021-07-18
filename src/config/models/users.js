const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	register_date: Date,
	last_login: Date
}, {
	timestamps: true
})

module.exports = mongoose.model('Users', UsersSchema)
