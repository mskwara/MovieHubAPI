const mongoose = require("mongoose");

const moviePersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A person must have a name."],
    },
    role: {
        type: String,
        enum: ["actor", "director", "screenwriter", "camera operator", "composer", "makeup artist"],
        required: [true, "A person must have a role."],
    },
    description: {
        type: String,
        required: [true, "A person must have a description."],
    },
    movies:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie',
        }
    ],
    awards:[
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Award',
        }
    ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
