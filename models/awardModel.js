const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Oscar", "Nobel"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "MoviePerson",
    },
    movie: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
    },
});

const Award = mongoose.model("Award", awardSchema);

module.exports = Award;
