const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    signupCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);
