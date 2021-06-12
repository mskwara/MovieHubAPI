const express = require("express");
const awardController = require("../controllers/awardController");

const router = express.Router();

router
    .route("/")
    .get(awardController.getAllAwards)
    .post(awardController.createAward);

router
    .route("/:awardID")
    .get(awardController.getAward)
    .patch(awardController.updateAward)
    .delete(awardController.deleteAward);

router
    .route("/awardName/:name")
    .get(awardController.getAwardByName)

module.exports = router;