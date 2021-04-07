const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: {
    type: String,
    required: [true, "User must have username."],
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  ratedMovies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Movie",
    },
  ],
=======
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
>>>>>>> 08dad5cbf2e2efe72f0ff2450f2f0ab57689b905
});

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = User;
=======
module.exports = User;
>>>>>>> 08dad5cbf2e2efe72f0ff2450f2f0ab57689b905
