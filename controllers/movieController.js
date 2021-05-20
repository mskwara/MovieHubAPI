const Movie = require("../models/movieModel");

exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();

        res.status(200).json({
            status: "success",
            results: movies.length,
            movies,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);

        res.status(201).json({
            status: "success",
            movie,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.movieID);

        res.status(200).json({
            status: "success",
            movie,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.movieID,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: "success",
            movie,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteMovie = async (req, res, next) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getTopMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find()
            .sort({
                ratingAverage: -1,
            })
            .limit(parseInt(req.params.quantity));

        res.status(200).json({
            status: "success",
            results: movies.length,
            movies,
        });
    } catch (err) {
        console.log(err);
    }
};
