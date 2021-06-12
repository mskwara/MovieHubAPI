const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const Review = require("../models/reviewModel");

function filterObj(obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-__v -password");

        res.status(200).json({
            status: "success",
            results: users.length,
            users,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userID);

        if (!user)
            res.status(404).json({
                status: "fail",
                message: "No user found with that ID.",
            });

        res.status(200).json({
            status: "success",
            user,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const filteredBody = filterObj(req.body, "description");
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            filteredBody,
            {
                select: "-passwordChangedAt",
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: updatedUser,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getUserWithNComments = async (req, res, next) => {
    try {
        let usersMatched = await Comment.aggregate([
            {
                $group: {
                    _id: "$userID",
                    comments: { $sum: 1 },
                },
            },
            {
                $match: {
                    comments: { $gte: parseInt(req.params.number) },
                },
            },
        ]);
        usersMatched = usersMatched.map((object) => object._id);

        const users = await User.find({
            _id: { $in: usersMatched },
        }).select("-description -__v");

        res.status(200).json({
            status: "success",
            users,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getUserWithNReviews = async (req, res, next) => {
    try {
        let usersMatched = await Review.aggregate([
            {
                $group: {
                    _id: "$userID",
                    reviews: { $sum: 1 },
                },
            },
            {
                $match: {
                    reviews: { $gte: parseInt(req.params.number) },
                },
            },
        ]);
        usersMatched = usersMatched.map((object) => object._id);

        const users = await User.find({
            _id: { $in: usersMatched },
        }).select("-description -__v");

        res.status(200).json({
            status: "success",
            users,
        });
    } catch (err) {
        console.log(err);
    }
};
