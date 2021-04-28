const express = require("express");
const movieController = require("../controllers/reviewController");

const router = express.Router();

router
    .route("/")
    .get(movieController.getAllReviews)
    .post(movieController.createReview);

router
    .route("/:reviewID")
    .get(movieController.getReview)
    .patch(movieController.updateReview)
    .delete(movieController.deleteReview);

module.exports = router;
