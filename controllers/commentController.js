const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({
            movie: req.params.movieID,
        });

        res.status(200).json({
            status: "success",
            results: comments.length,
            comments,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({
            text: req.body.text,
            movie: req.params.movieID,
            user: req.user._id,
            date: Date.now(),
        });

        res.status(201).json({
            status: "success",
            comment,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentID);
        console.log("rak");

        res.status(200).json({
            status: "success",
            comment,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.commentID,
            { text: req.body.text },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            comment,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
