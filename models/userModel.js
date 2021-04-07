const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must have username."],
    },
    description: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "User must have a password"]
    },
    ratedMovies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;