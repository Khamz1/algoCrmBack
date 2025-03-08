const { Router } = require("express");
const route = Router();
const { productsController } = require("../controllers/product.controller");

route.get('/products', productsController.getProducts);
route.post('/products', productsController.addProduct);
route.delete('/products/:id', productsController.deleteProduct)
route.patch('/products/:id', productsController.changeProducts)

module.exports = route
