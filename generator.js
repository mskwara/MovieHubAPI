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

const MOVIES_COUNT = 1000;
const MOVIE_PERSONS_COUNT = 1000;
const AWARDS_COUNT = 200;
const REVIEWS_COUNT = 2000;
const COMMENTS_COUNT = 3000;
const NEWS_COUNT = 400;
const USERS_COUNT = 500;

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
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
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
    for (let i = 0; i < MOVIE_PERSONS_COUNT; i++) {
        data.push({
            name: phrase(1, 2),
            role: roles[random(0, roles.length)],
            birthdate: randomDate(new Date(1979, 0, 1), new Date()),
            description: phrase(50, 200),
        });
    }
    await MoviePerson.create(data);
    console.log("Movie persons generating finished!\n");
};

const generateMovies = async () => {
    console.log("Generating movies...");
    const genres = ["family", "comedy", "religious", "action", "sci-fi"];
    const data = [];
    const moviePersons = await MoviePerson.find();
    for (let i = 0; i < MOVIES_COUNT; i++) {
        const thisMovieCrewSet = new Set();
        const crewCount = random(20, 50);
        for (let c = 0; c < crewCount; c++) {
            thisMovieCrewSet.add(
                moviePersons[random(0, moviePersons.length)]._id
            );
        }
        data.push({
            title: phrase(1, 4),
            description: phrase(50, 200),
            genre: genres[random(0, genres.length)],
            date: randomDate(new Date(1979, 0, 1), new Date()),
            crew: [...thisMovieCrewSet],
        });
    }
    await Movie.create(data);
    console.log("Movies generating finished!\n");
};

const addMoviesToMoviePersons = async () => {
    console.log("Generating movies in movie person assignment...");
    const moviePersons = await MoviePerson.find();
    for (const moviePerson of moviePersons) {
        const hisMovies = await Movie.find({ crew: moviePerson._id });
        moviePerson.movies = hisMovies;
        await moviePerson.save();
    }
    console.log("Assignment generating finished!\n");
};

const generateAwards = async () => {
    console.log("Generating awards...");
    const data = [];
    const awardNames = [
        "Oscar",
        "Golden Globe",
        "Golden Raspberry",
        "Emmy Award",
    ];
    const moviePersons = await MoviePerson.find();
    const movies = await Movie.find();
    for (let i = 0; i < AWARDS_COUNT; i++) {
        data.push({
            awardName: awardNames[random(0, awardNames.length)],
            moviePerson: moviePersons[random(0, moviePersons.length)]._id,
            movie: movies[random(0, movies.length)]._id,
            date: randomDate(new Date(1979, 0, 1), new Date()),
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
    const moviesToUpdate = [];
    for (let i = 0; i < REVIEWS_COUNT; i++) {
        const movieID = movies[random(0, movies.length)]._id;
        const rating = random(1, 5 + 1);
        data.push({
            content: phrase(5, 100),
            rating,
            movieID,
            userID: users[random(0, users.length)]._id,
        });
        if (moviesToUpdate.some((entry) => entry.movieID === movieID)) {
            const existingEntry = moviesToUpdate.filter(
                (entry) => entry.movieID === movieID
            )[0];
            existingEntry.values.sum += rating;
            existingEntry.values.quantity++;
        } else {
            moviesToUpdate.push({
                movieID,
                values: {
                    sum: rating,
                    quantity: 1,
                },
            });
        }
    }
    await Review.create(data);
    for (const entry of moviesToUpdate) {
        await Movie.findByIdAndUpdate(entry.movieID, {
            $set: {
                ratingAverage: entry.values.sum / entry.values.quantity,
                ratingQuantity: entry.values.quantity,
            },
        });
    }
    console.log("Reviews generating finished!\n");
};

const generateComments = async () => {
    console.log("Generating comments...");
    const data = [];
    const movies = await Movie.find();
    const users = await User.find();
    for (let i = 0; i < COMMENTS_COUNT; i++) {
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
    for (let i = 0; i < NEWS_COUNT; i++) {
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

    for (let i = 0; i < USERS_COUNT; i++) {
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
    await User.create(data);
    const admin = {
        username: "test",
        password: "test",
        role: "admin",
        description: "To jest konto do testowania.",
    };
    await User.create(admin);
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

        await dropAllCollections();
        await generateMoviePersons();
        await generateMovies();
        await addMoviesToMoviePersons();
        await generateAwards();
        await generateUsers();
        await generateReviews();
        await generateComments();
        await generateNews();

        console.log("ALL DATA HAS BEEN GENERATED!");
        mongoose.disconnect();
    });
