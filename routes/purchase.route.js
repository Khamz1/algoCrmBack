const {Router} = require("express");
const route = Router();
const {purchaseController} = require("../controllers/purchase.controller");

route.get('/purchase',purchaseController.getPurchase);
route.get('/purchase/:id',purchaseController.getPurchaseById);
route.delete('/products/:id',purchaseController.deletePurchase)
route.post('/purchase',purchaseController.addPurchase)

module.exports=route
