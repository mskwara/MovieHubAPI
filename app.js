const express = require("express");
const movieRouter = require("./routers/movieRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/movies", movieRouter);

app.use("/users", userRouter);

module.exports = app;
