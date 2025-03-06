const Router = require("express");
const { cartController } = require("../controllers/cart.controller")

const router = Router()

router.get("/cart/:studentId", cartController.get)
router.patch("/cart/:studentId/add/:productId", cartController.addToCart)
router.patch("/cart/:studentId/remove/:productId", cartController.addToCart)

module.exports = router