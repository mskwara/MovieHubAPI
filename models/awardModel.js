const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Oscar", "Golden Globe", "Golden Raspberry", "Emmy Award"],
    },
    date: {
        type: Date,
        required: [true, "A award must have a date."],
        ref: "date",
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
