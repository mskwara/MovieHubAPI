const express = require("express");

const app = express();

// testowy request

app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Testowy response",
    });
});

app.get("/aaa", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "aaaaaaaaaaaaaaa",
    });
});

module.exports = app;
