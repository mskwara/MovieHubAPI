const express = require("express");
const movieController = require("../controllers/moviePersonController");

const router = express.Router();

router
    .route("/")
    .post(movieController.createMoviePerson)
    .get(movieController.getAllPersons);

router
    .route("/:moviePersonID")
    .get(movieController.getMoviePerson)
    .patch(movieController.updateMoviePerson)
    .delete(movieController.deleteMoviePerson);

router
    .route("/role/:role")
    .get(movieController.getPersonsByRole)

//router.route("/top/:quantity").get(movieController.getTopMovies);

module.exports = router;