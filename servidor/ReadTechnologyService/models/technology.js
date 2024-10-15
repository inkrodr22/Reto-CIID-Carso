const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    adoptionStatus: {
        type: String,
        required: true,
    },
    currentUsage: {
        type: String,
        required: true,
    },
    implementationCost: {
        type: Number,
        required: true,
    },
    maturityLevel: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Technology = mongoose.model('Technology', TechnologySchema);

module.exports = Technology;
