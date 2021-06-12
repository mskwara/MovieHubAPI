const express = require("express");
const movieController = require("../controllers/movieController");
const commentController = require("../controllers/commentController");
const awardController = require("../controllers/awardController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(movieController.getAllMovies)
    .post(
        authController.protect,
        authController.restrictTo("admin"),
        movieController.createMovie
    );

router
    .route("/:movieID")
    .get(movieController.getMovie)
    .patch(
        authController.protect,
        authController.restrictTo("admin"),
        movieController.updateMovie,
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        movieController.deleteMovie,
    );

router.route("/top/:quantity").get(movieController.getTopMovies);

router.route("/:movieID/awards").get(awardController.getMovieAwards);

router.use(authController.protect);

router
    .route("/:movieID/comments")
    .get(commentController.getAllComments)
    .post(commentController.createComment);

module.exports = router;
