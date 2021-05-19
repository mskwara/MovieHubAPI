const express = require("express");
const movieRouter = require("./routers/movieRouter");

const userRouter = require("./routers/userRouter");
const awardRouter = require("./routers/awardRouter");
const reviewRouter = require("./routers/reviewRouter");
const newsRouter = require("./routers/newsRouter");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/awards", awardRouter);
app.use("/movies", movieRouter);

app.use("/users", userRouter);

app.use("/reviews", reviewRouter);
app.use("/news", newsRouter);

module.exports = app;
