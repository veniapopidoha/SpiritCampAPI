const mongoose = require('mongoose')

const Payment = mongoose.Schema ({
    userId: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Payment', Payment)