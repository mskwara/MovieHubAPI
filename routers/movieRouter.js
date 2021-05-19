const express = require("express");
const movieController = require("../controllers/movieController");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(movieController.getAllMovies)
    .post(movieController.createMovie);

router
    .route("/:movieID")
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

router.route("/top/:quantity").get(movieController.getTopMovies);

router.use(authController.protect);

router
    .route("/:movieID/comments")
    .get(commentController.getAllComments)
    .post(commentController.createComment);

module.exports = router;
