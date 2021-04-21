const Award = require("../models/movieModel");

exports.getAllAwards = async (req, res, next) => {
    try {
        const awards = await Award.find();

        res.status(200).json({
            status: "success",
            results: awards.length,
            awards,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createAward = async (req, res, next) => {
    try {
        const award = await Award.create(req.body);

        res.status(201).json({
            status: "success",
            award,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAward = async (req, res, next) => {
    try {
        const award = await Award.findById(req.params.awardID);

        res.status(200).json({
            status: "success",
            award,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateAward = async (req, res, next) => {
    try {
        const award = await Award.findByIdAndUpdate(
            req.params.awardID,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: "success",
            award,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteAward = async (req, res, next) => {
    try {
        await Award.findByIdAndDelete(req.params.awardID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
