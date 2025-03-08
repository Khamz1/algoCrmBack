const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    list: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID продукта
        title: { type: String, required: true }, // Название продукта
        price: { type: Number, required: true }, // Цена продукта
        description: { type: String }, // Описание продукта
        left: { type: Number, required: true }, // Количество оставшегося товара
        amount: { type: Number, required: true } // Количество товара в корзине
    }]
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart