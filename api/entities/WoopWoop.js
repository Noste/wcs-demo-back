const mongoose = require('mongoose')
const conn = require('../connections/index').mongo

/* WoopWoop Schema
 * ----------- */

// https://mongoosejs.com/docs/guide.html
const WoopWoopSchema = new mongoose.Schema({
    woopWoopBoolean: {
        type: Boolean,
        default: ''
    }
})

module.exports = conn.model('WoopWoop', WoopWoopSchema)
