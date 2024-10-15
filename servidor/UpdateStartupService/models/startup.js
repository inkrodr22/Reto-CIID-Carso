const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const startupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foundedDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    investmentReceived: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employees: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Startup', startupSchema);
