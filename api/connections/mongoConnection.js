// Load deps
const mongoose = require('mongoose')
const uriUtil = require('mongodb-uri')

const config = require('../config')

// Create a new connection
mongoose.Promise = global.Promise

const dbURI = uriUtil.formatMongoose(config.mongoUri)
const options = {
    autoReconnect: true,
    useNewUrlParser: true
}
const conn = mongoose.createConnection(dbURI, options)

conn.on('open', () => console.log('DB connection open'))
conn.on('error', err => console.log(`DB connection error : ${err.message}`, err))

module.exports = conn
