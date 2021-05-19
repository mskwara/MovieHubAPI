const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "You can't post an empty comment"]
    },
    date: {
        type: Date
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
    },
});

const Comment = mongoose.model("Comment", awardSchema);

module.exports = Comment;
