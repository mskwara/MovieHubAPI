const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);

router
    .route("/:userID")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(authController.restrictTo("admin"), userController.deleteUser);

router
    .route("/")
    .get(authController.restrictTo("admin"), userController.getAllUsers);

module.exports = router;
