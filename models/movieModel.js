const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A movie must have a title."],
    },
    description: String,
    genre: {
        type: String,
        enum: ["family", "comedy", "religious", "action", "sci-fi"],
    },
    date: {
        type: Date,
        required: [true, "A movie must have a date."],
    },
    crew: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "MoviePerson",
        },
    ],
    ratingAverage: {
        type: Number,
        min: 1,
        max: 5,
        default: 4.5,
        set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
        type: Number,
        min: 0,
        default: 0,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
