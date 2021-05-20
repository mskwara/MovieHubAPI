const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, "empty news."],
    },
    author: 
        {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
