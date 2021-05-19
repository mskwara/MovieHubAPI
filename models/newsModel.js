const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    News: {
        type: String,
        required: [true, "empty news."],
    },
    author: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
    ],

});

const News = mongoose.model("News", newsSchema);

module.exports = News;