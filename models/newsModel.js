const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, "News cannot be empty."],
    },
    userID: 
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
       date: {
        type: Date,
        default: Date.now

        }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
