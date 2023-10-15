const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add your First Name']
    },
    fullname: {
        type: String,
        required: [true, 'Please add your Middle Name']
    },
    phone: {
        type: String,
        required: [true, 'Please add your Last Name']
    },
    address: {
        type: String,
        required: [true, 'Please add your Complete Address']
    },
    email: {
        type: String,
        required: [true, 'Please add your Email']
    },
    password: {
        type: String,
        required: [true, 'Please add your Password']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)