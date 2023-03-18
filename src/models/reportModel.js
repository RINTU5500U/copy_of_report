const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true
    },
    helpMsg: {
        type: String,
            trim: true
    },
    file: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    request: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    }
});

module.exports = mongoose.model('Report', reportSchema) 