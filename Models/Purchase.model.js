const mongoose = require('mongoose');
const Product = require('./Product.model'); // Импортируем модель Product

// Схема для покупки
const purchaseSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now }, // Дата покупки (по умолчанию текущая дата)
    total: { type: Number, required: true }, // Общая сумма покупки
    productList: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Ссылка на продукт
            left: { type: Number, required: true }, // Количество продукта
        },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на студента
});

// Модель Purchase
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
