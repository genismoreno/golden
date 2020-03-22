const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const phraseSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sumCrc: { type: Number, required: true },
    createdAt : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Phrase', phraseSchema);
