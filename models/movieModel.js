const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A movie must have a title."],
    },
    description: String,
    actors: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "MoviePerson",
        },
    ],
    ratingSum: {
        type: Number,
        min: 0,
        default: 0,
    },
    ratingQuantity: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
