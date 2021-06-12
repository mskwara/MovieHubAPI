const express = require("express");
const movieController = require("../controllers/movieController");
const commentController = require("../controllers/commentController");
const awardController = require("../controllers/awardController");
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

router.route("/:movieID/awards").get(awardController.getMovieAwards);
router.route("/between/:begin/:end").get(movieController.getMoviesInPeriod);

module.exports = router;
