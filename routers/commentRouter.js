const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.route("/");

router
    .route("/:commentID")
    .get(commentController.getComment)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment);

module.exports = router;
