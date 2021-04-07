const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review_content: {
        type: String,
    },
    FilmID: {
        type: int,
        required: [true, "Comment has to belong to the movie"],
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
