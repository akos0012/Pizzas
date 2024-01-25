const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const AllergenSchema = new Schema({
    name: String
});

module.exports = mongoose.model("Allergen", AllergenSchema);