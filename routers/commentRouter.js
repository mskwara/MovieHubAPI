const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/");

router
    .route("/:commentID")
    .get(commentController.getComment)
    .patch(authController.protect, commentController.updateComment)
    .delete(authController.protect, commentController.deleteComment);

module.exports = router;
