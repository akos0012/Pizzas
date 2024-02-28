const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    img: String
});

module.exports = mongoose.model("Image", ImageSchema);