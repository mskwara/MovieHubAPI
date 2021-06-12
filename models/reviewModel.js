const mongoose = require("mongoose");
const Movie = require("./movieModel");

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    movieID: {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
});

reviewSchema.statics.calcAverageRatings = async function (movieID) {
    const stats = await this.aggregate([
        {
            $match: { movieID },
        },
        {
            $group: {
                _id: "$movieID",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);

    if (stats.length > 0) {
        await Movie.findByIdAndUpdate(movieID, {
            ratingQuantity: stats[0].nRating,
            ratingAverage: stats[0].avgRating,
        });
    } else {
        await Movie.findByIdAndUpdate(movieID, {
            ratingQuantity: 0,
            ratingAverage: 4.5,
        });
    }
};

reviewSchema.post("save", function () {
    // this to obiekt review
    this.constructor.calcAverageRatings(this.movieID);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRatings(this.r.movieID);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
