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

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

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
    const genres = ["family", "comedy", "religious", "action", "sci-fi"];
    const data = [];
    for (let i = 0; i < 1000; i++) {
        data.push({
            title: phrase(1, 4),
            description: phrase(50, 200),
            genre: genres[random(0, genres.length)],
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

const generateAwards = async () => {
    console.log("Generating awards...");
    const data = [];
    const types = ["Oscar", "Nobel"];
    const moviePersons = await MoviePerson.find();
    const movies = await Movie.find();
    for (let i = 0; i < 200; i++) {
        data.push({
            type: types[random(0, 1)],
            moviePerson: moviePersons[random(0, moviePersons.length)]._id,
            movie: movies[random(0, movies.length)]._id,
            date: randomDate(new Date(1979, 0, 1), new Date())
        });
    }
    await Award.create(data);
    console.log("Awards generating finished!\n");
};

const generateReviews = async () => {
    console.log("Generating reviews...");
    const data = [];
    const movies = await Movie.find();
    const users = await User.find();
    for (let i = 0; i < 200; i++) {
        data.push({
            content: phrase(5, 100),
            rating: random(1, 5),
            movieID: movies[random(0, movies.length)]._id,
            userID: users[random(0, users.length)]._id,
        });
    }
    await Review.create(data);
    console.log("Reviews generating finished!\n");
};

const generateComments = async () => {
    console.log("Generating comments...");
    const data = [];
    const movies = await Movie.find();
    const users = await User.find();
    for (let i = 0; i < 2000; i++) {
        data.push({
            content: phrase(5, 100),
            movieID: movies[random(0, movies.length)]._id,
            userID: users[random(0, users.length)]._id,
        });
    }
    await Comment.create(data);
    console.log("Comments generating finished!\n");
};

const generateNews = async () => {
    console.log("Generating news...");
    const data = [];
    const users = await User.find();
    for (let i = 0; i < 500; i++) {
        data.push({
            content: phrase(300, 700),
            userID: users[random(0, users.length)]._id,
        });
    }
    await News.create(data);
    console.log("News generating finished!\n");
};

// Dodaje długo //
const generateUsers = async () => {
    console.log("Generating users...");
    password = "aaaaaaaa";
    const data = [];
    const usernames = new Set();
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 500; i++) {
        let role = "user";
        if (random(1, 100) == 1) {
            role == "admin";
        }
        let username;
        do {
            username = "";
            for (let j = 0; j < random(6, 15); j++) {
                username += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
        } while (username in usernames);
        usernames.add(username);

        data.push({
            username,
            password,
            role,
            description: phrase(10, 50),
        });
    }
    console.log("HI");
    await User.create(data);
    console.log("User generating finished!\n");
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
        // await generateMovies();
        // await generateMoviePersons();
        // await generateAwards();
        // await generateUsers();
        // await generateReviews();
        // await generateComments();
        // await generateNews();
        // await dropAllCollections();
        // generateMovies();
        // await generateMoviePersons();

        console.log("ALL DATA HAS BEEN GENERATED!");
        mongoose.disconnect();
    });
