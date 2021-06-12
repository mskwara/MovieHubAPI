const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "You can't post an empty comment"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    movieID: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
    },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
