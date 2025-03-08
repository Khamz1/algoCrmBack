const Router = require("express");
const { cartController } = require("../controllers/cart.controller")

const router = Router()

router.get("/cart/:userId", cartController.get)
router.patch("/cart/:userId/add/:productId", cartController.addToCart)
router.patch("/cart/:userId/remove/:productId", cartController.removeFromCart)
router.post("/cart/makePurchase/:userId/", cartController.makePurchase)

module.exports = router