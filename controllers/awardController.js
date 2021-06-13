const Award = require("../models/awardModel");

exports.getAllAwards = async (req, res, next) => {
    try {
        const awards = await Award.find().sort({ date: -1 });

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

exports.getAwardByName = async (req, res, next) => {
    try {
        const awards = await Award.find({ awardName: req.params.name });

        res.status(200).json({
            status: "success",
            results: awards.length,
            awards,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getPersonAwards = async (req, res, next) => {
    try {
        const awards = await Award.find({
            moviePerson: req.params.moviePersonID,
        });

        res.status(200).json({
            status: "success",
            results: awards.length,
            awards,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getMovieAwards = async (req, res, next) => {
    try {
        const awards = await Award.find({ movie: req.params.movieID });

        res.status(200).json({
            status: "success",
            results: awards.length,
            awards,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAwardsInPeriod = async (req, res, next) => {
    try {
        const begin = new Date(req.params.begin);
        const end = new Date(req.params.end);

        const awards = await Award.find({
            date: { $gte: begin, $lte: end },
        }).sort({ date: -1 });

        res.status(200).json({
            status: "success",
            results: awards.length,
            awards,
        });
    } catch (err) {
        console.log(err);
    }
};
