const express = require("express");
const moviePersonController = require("../controllers/moviePersonController");

const router = express.Router();

router
    .route("/")
    .post(moviePersonController.createMoviePerson)
    .get(moviePersonController.getAllPersons);

router
    .route("/:moviePersonID")
    .get(moviePersonController.getMoviePerson)
    .patch(moviePersonController.updateMoviePerson)
    .delete(moviePersonController.deleteMoviePerson);

router
    .route("/role/:role")
    .get(moviePersonController.getPersonsByRole)

module.exports = router;