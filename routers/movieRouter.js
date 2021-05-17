const express = require("express");
const movieController = require("../controllers/movieController");

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

module.exports = router;
