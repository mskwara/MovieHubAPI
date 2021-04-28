const Review = require("../models/reviewModel");

exports.getAllReviews = async (req, res, next) => {
    try {
        const review = await Review.find();

        res.status(200).json({
            status: "success",
            results: review.length,
            review,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createReview = async (req, res, next) => {
    try {
        const review = await Review.create(req.body);

        res.status(201).json({
            status: "success",
            review,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewID);

        res.status(200).json({
            status: "success",
            review,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.reviewID,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: "success",
            review,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
