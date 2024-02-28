const mongoose = require("mongoose");
const { Schema } = mongoose;

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    ingredients: Array,
    price: {
        type: Number,
        required: true
    },
    allergens: [{
        type: Schema.Types.ObjectId,
        ref: "Allergen"
    }],
    img: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    }
});

module.exports = mongoose.model("Pizza", PizzaSchema);