const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        enum: ["application/pdf", "image/jpeg", "image/png"],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'redacted'],
        default: 'pending'
    },
    risk_score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    summary: {
        type: String,
        default: ""
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Document', documentSchema);
