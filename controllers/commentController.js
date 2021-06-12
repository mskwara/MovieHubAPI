const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({
            movie: req.params.movieID,
        }).sort({ date: -1 });

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

        if (user._id != comment.userID) {
            return res.status(403).json({
                status: "fail",
                message: "You don't have permission to perform this action.",
            });
        }

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
        const comment = await Comment.findById(req.params.commentID);
        if (user._id != comment.userID) {
            return res.status(403).json({
                status: "fail",
                message: "You don't have permission to perform this action.",
            });
        }

        comment.delete();

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
