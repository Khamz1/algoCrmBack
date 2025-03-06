const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    studentId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    list: {
        type: Array,
        required: true
    }
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart