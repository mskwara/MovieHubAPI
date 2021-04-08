const express = require("express");
const movieRouter = require("./routers/movieRouter");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/movies", movieRouter);

module.exports = app;
