const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
    awardName: {
        type: String,
        enum: ["Oscar", "Golden Globe", "Golden Raspberry", "Emmy Award"],
    },
    date: {
        type: Date,
        required: [true, "A award must have a date."],
    },
    moviePerson: {
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
