const News = require("../models/newsModel.js");

exports.getAllNews = async (req, res, next) => {
    try {
        const news = await News.find().sort({ date: -1 });

        res.status(200).json({
            status: "success",
            results: news.length,
            news,
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
        const oneNews = await News.findById(req.params.newsID);

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
            req.params.newsID,
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
        await News.findByIdAndDelete(req.params.newsID);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
};
