const mongoose = require("mongoose");
const { Schema } = mongoose;

const PizzaSchema = new Schema({
    name: String,
    ingredients: Array,
    price: Number,
    allergens: [{
        type: Schema.Types.ObjectId,
        ref: "Allergen"
    }],
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Pizza", PizzaSchema);