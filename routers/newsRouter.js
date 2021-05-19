const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router
    .route("/")
    .get(newsController.getAllNews)
    .post(newsController.createNews);

router
    .route("/:newsID")
    .get(newsController.getNews)
    .patch(newsController.updateNews)
    .delete(newsController.deleteNews);

module.exports = router;
