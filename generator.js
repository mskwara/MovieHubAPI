const mock = require("./mock/mock.json");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("./models/movieModel");
const Award = require("./models/awardModel");
const Comment = require("./models/commentModel");
const MoviePerson = require("./models/moviePersonModel");
const News = require("./models/newsModel");
const Review = require("./models/reviewModel");
const User = require("./models/userModel");
dotenv.config({ path: "./config.env" });

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const phrase = (min, max) => {
    const wordCount = random(min, max);

    const words = [];
    for (let i = 0; i < wordCount; i++) {
        const randomIndex = random(0, mock.length);
        words.push(mock[randomIndex]);
    }
    return words.join(" ");
};

const dropAllCollections = async () => {
    console.log("Dropping existing collections...");
    await Movie.deleteMany();
    await Award.deleteMany();
    await Comment.deleteMany();
    await MoviePerson.deleteMany();
    await News.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log("All collections have been dropped!\n");
};

const generateMovies = async () => {
    console.log("Generating movies...");
    const data = [];
    for (let i = 0; i < 1000; i++) {
        data.push({
            title: phrase(1, 4),
            description: phrase(50, 200),
        });
    }
    await Movie.create(data);
    console.log("Movies generating finished!\n");
};
const generateMoviePersons = async () => {
    console.log("Generating movie persons...");
    const data = [];
    const roles = [
        "actor",
        "director",
        "screenwriter",
        "camera operator",
        "composer",
        "makeup artist",
    ];
    const movies = await Movie.find();
    for (let i = 0; i < 1000; i++) {
        const hisMoviesSet = new Set();
        const moviesCount = random(1, 20);
        for (let m = 0; m < moviesCount; m++) {
            hisMoviesSet.add(movies[random(0, movies.length)]._id);
        }
        data.push({
            name: phrase(1, 2),
            role: roles[random(0, roles.length)],
            description: phrase(50, 200),
            movies: hisMoviesSet,
        });
    }
    await MoviePerson.create(data);
    console.log("Movie persons generating finished!\n");
};

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(async () => {
        console.log("DB connection established!");
        // await dropAllCollections();
        // generateMovies();
        await generateMoviePersons();

        console.log("ALL DATA HAS BEEN GENERATED!");
        mongoose.disconnect();
    });
