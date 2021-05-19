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
        const persons = await MoviePerson.find(
            {role: req.params.role}
        );

        res.status(200).json({
            status: "success",
            results: persons.length,
            persons,
        });
    } catch (err) {
        console.log(err);
    }
};