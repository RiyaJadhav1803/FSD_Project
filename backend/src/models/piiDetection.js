const mongoose = require('mongoose');

const piiDetectionSchema = new mongoose.Schema({
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
        index: true  // Improves query performance
    },
    pii_type: {
        type: String,
        required: true,
        enum: ['Aadhaar', 'PAN', 'Driving License', 'Passport', 'Bank Account', 'Phone Number', 'Email']
    },
    pii_data: {
        type: String, // Masked representation if needed
        required: true
    },
    confidence_score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('PIIDetection', piiDetectionSchema);
