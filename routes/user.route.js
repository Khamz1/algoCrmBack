const Router = require("express");
const { userController } = require("../controllers/user.controller");

const router = Router()

router.post("/user", userController.add);
router.patch("/user/:id", userController.edit);
router.patch("/user/:id/points", userController.editPoints);

module.exports = router
