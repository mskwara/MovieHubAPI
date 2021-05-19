const express = require("express");
const movieRouter = require("./routers/movieRouter");

const userRouter = require("./routers/userRouter");
const awardRouter = require("./routers/awardRouter");
const moviePersonRouter = require("./routers/moviePersonRouter");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/awards", awardRouter);
app.use("/movies", movieRouter);
app.use("/moviepersons", moviePersonRouter);

app.use("/users", userRouter);

module.exports = app;
