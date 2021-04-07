const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A game must have a title."],
    },
    description: {
        type: String,
        required: [true, "A movie must have a description."],
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
