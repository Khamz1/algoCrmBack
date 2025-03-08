const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    left: Number

})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
