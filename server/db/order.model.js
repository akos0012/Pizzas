const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    contact: {
        email: { type: String, required: true },
        phone: { type: Number, required: true }
    },
    delivery: {
        country: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        company: { type: String }
    },
    orders: [{
        order: { type: Schema.Types.ObjectId, ref: "Pizza" },
        quantity: { type: Number }
    }],
    orderDateUTC: {
        type: Date,
        default: Date.now
    },
});

// Custom validator to ensure orders array is not empty
OrderSchema.path('orders').validate(function (orders) {
    return orders.length > 0;
}, 'Orders array must not be empty');


module.exports = mongoose.model("Order", OrderSchema);