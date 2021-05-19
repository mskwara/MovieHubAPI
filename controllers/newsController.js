const News = require("../models/newsModel.js");

exports.getAllNews = async (req, res, next) => {
    try {
        const oneNews = await News.find();

        res.status(200).json({
            status: "success",
            results: oneNews.length,
            oneNews,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createNews = async (req, res, next) => {
    try {
        const oneNews = await News.create(req.body);

        res.status(201).json({
            status: "success",
            oneNews,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getNews = async (req, res, next) => {
    try {
        const oneNews = await News.findById(req.params.NewsID);

        res.status(200).json({
            status: "success",
            oneNews,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updateNews = async (req, res, next) => {
    try {
        const oneNews = await News.findByIdAndUpdate(
            req.params.NewsID,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: "success",
            oneNews,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteNews = async (req, res, next) => {
    try {
        await News.findByIdAndDelete(req.params.NewsID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
