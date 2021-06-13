const MoviePerson = require("../models/moviePersonModel");

exports.createMoviePerson = async (req, res, next) => {
    try {
        const person = await MoviePerson.create(req.body);

        res.status(201).json({
            status: "success",
            person,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllPersons = async (req, res, next) => {
    try {
        const persons = await MoviePerson.find();

        res.status(200).json({
            status: "success",
            results: persons.length,
            persons,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getMoviePerson = async (req, res, next) => {
    try {
        const person = await MoviePerson.findById(req.params.moviePersonID);

        res.status(200).json({
            status: "success",
            person,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateMoviePerson = async (req, res, next) => {
    try {
        const person = await MoviePerson.findByIdAndUpdate(
            req.params.moviePersonID,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: "success",
            person,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteMoviePerson = async (req, res, next) => {
    try {
        await MoviePerson.findByIdAndDelete(req.params.moviePersonID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getPersonsByRole = async (req, res, next) => {
    try {
        const persons = await MoviePerson.find({ role: req.params.role });

        res.status(200).json({
            status: "success",
            results: persons.length,
            persons,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getPersonMovies = async (req, res, next) => {
    try {
        const person = await MoviePerson.findById(req.params.moviePersonID);

        if (!person)
            return res.status(400).json({
                status: "fail",
                message: "This actor does not exist.",
            });

        res.status(200).json({
            status: "success",
            results: person.movies.length,
            movies: person.movies,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getPersonsWithTodaysBirthday = async (req, res, next) => {
    try {
        const today = new Date();
        const tommorow = new Date();
        tommorow.setDate(today.getDate() + 1);

        const persons = await MoviePerson.find({
            birthdate: {
                $gte: today,
                $lt: tommorow,
            },
        });

        res.status(200).json({
            status: "success",
            results: persons.length,
            persons,
        });
    } catch (err) {
        console.log(err);
    }
};
