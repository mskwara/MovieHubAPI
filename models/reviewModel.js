const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewContent: {
        type: String,
    },
    movieID: {
        type: int,
        required: [true, "Review has to belong to the movie"],
    },
});

const Review = mongoose.model("Review", movieSchema);

module.exports = Review;
