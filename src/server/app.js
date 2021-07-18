const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()

const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

const express = require('express'),
    app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())
app.options('*', cors())

app.use(helmet())

app.set('trust proxy', 1)
app.use(cookieParser())
app.use(session({
    secret: "callipsa",
    resave: true,
    saveUninitialized: true
}))

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Callipsa');
    next();
}

app.use(customHeaders);

const mongoose = require('./../config/db/mongodb')
// Connecting to the database
mongoose.connect(process.env.DB_URL, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...')
})

const authApi = require('./../api/auth.api')
const EventApi = require('../api/event.api')

app.use('/auth', authApi)
app.use('/', EventApi)

module.exports.app = app
module.exports.mongoose = mongoose
