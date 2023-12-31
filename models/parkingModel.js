const mongoose = require('mongoose')

const parkingSchema = mongoose.Schema({
    customer: {
        type: String,
        required: [true, 'Please a value']
    },
    date: {
        type: Date,
        default: Date.now
    },
    total_hours: {
        type: String,
    },
    total_amount: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: null,
    },
    isCanceled: {
        type: Boolean,
        default: null,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Parking', parkingSchema)