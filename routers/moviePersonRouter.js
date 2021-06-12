const express = require("express");
const moviePersonController = require("../controllers/moviePersonController");
const awardController = require("../controllers/awardController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(moviePersonController.getAllPersons)
    .post(
        authController.protect,
        authController.restrictTo("admin"),
        moviePersonController.createMoviePerson,
    );

router
    .route("/:moviePersonID")
    .get(moviePersonController.getMoviePerson)
    .patch(
        authController.protect,
        authController.restrictTo("admin"),
        moviePersonController.updateMoviePerson,
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        moviePersonController.deleteMoviePerson,
    );

router
    .route("/role/:role")
    .get(moviePersonController.getPersonsByRole);

router
    .route("/:moviePersonID/movies")
    .get(moviePersonController.getPersonMovies);

router
    .route("/todaysBirthday")
    .get(moviePersonController.getPersonsWithTodaysBirthday);

router
    .route("/:moviePersonID/awards")
    .get(awardController.getPersonAwards);


module.exports = router;
