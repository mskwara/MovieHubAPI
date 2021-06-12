const mongoose = require("mongoose");

const moviePersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A person must have a name."],
    },
    birthdate: {
        type: Date,
        required: [true, "A person must have a birthdate."],
        ref: "birthdate",
    },
    role: {
        type: String,
        enum: [
            "actor",
            "director",
            "screenwriter",
            "camera operator",
            "composer",
            "makeup artist",
        ],
        required: [true, "A person must have a role."],
    },
    description: {
        type: String,
        required: [true, "A person must have a description."],
    },
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Movie",
        },
    ],
});

const MoviePerson = mongoose.model(
    "MoviePerson",
    moviePersonSchema
);

module.exports = MoviePerson;
