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
        authController.protect,
        authController.restrictTo("admin"),
        awardController.updateAward
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        awardController.deleteAward
    );

router.route("/awardName/:name").get(awardController.getAwardByName);
router.route("/between/:begin/:end").get(awardController.getAwardsInPeriod);

module.exports = router;
