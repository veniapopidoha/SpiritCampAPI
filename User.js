const mongoose = require('mongoose')

const UserSchema = mongoose.Schema ({
    name: {
        type: String,
        required: false
    },
    surname: {
        type: String,
        required: false
    },
    fatherName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    church: {
        type: String,
        required: false
    },
    leader: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    },
    transport: {
        type: String,
        required: false
    },
    submit: {
        type: String,
        required: false
    },
    ident: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('UserSchema', UserSchema)