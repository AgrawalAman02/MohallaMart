const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    endDate: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Deal', dealSchema);