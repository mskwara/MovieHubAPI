const express = require("express");
const awardController = require("../controllers/awardController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(awardController.getAllAwards)
    .post(awardController.createAward);

router
    .route("/:awardID")
    .get(awardController.getAward)
    .patch(
        awardController.updateAward,
        authController.protect,
        authController.restrictTo("admin")
    )
    .delete(
        awardController.deleteAward,
        authController.protect,
        authController.restrictTo("admin")
    );

router.route("/awardName/:name").get(awardController.getAwardByName);

module.exports = router;
