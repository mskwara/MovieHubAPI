const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router
    .route("/")
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview);

router
    .route("/:reviewID")
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview);

module.exports = router;
