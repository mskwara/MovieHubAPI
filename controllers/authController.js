const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const { promisify } = require("util");

function authToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

function createAuthToken(user, statusCode, res) {
    const token = authToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
    };

    user.password = undefined;

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: user,
    });
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: "fail",
                message: "You don't have permission to perform this action",
            });
        }
        next();
    };
};

exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token && req.cookies) {
            token = req.cookies.jwt;
        }

        if (!token) {
            res.status(401).json({
                status: "fail",
                message: "You are not logged in. Log in to get access.",
            });
        }

        // 2) Verification of the token
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id).select("+role");

        if (!currentUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user does not longer exist.",
            });
        }

        // 4) Check if user changed password after token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                status: "fail",
                message: "User recently changed password! Please log in again!",
            });
        }

        // Grant access to protected route
        req.token = token;
        req.user = currentUser;
        next();
    } catch (err) {
        // console.log(err);
        return res.status(401).json({
            status: "fail",
            message: "Authentication failed",
        });
    }
};

exports.signup = async (req, res, next) => {
    try {
        if (req.body.password != req.body.passwordConfirm)
            res.status(404).json({
                status: "fail",
                message: "Passwords are not the same.",
            });
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        createAuthToken(newUser, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            const key = Object.getOwnPropertyNames(err.keyValue)[0];
            const message = `Duplicate field value: ${err.keyValue[key]}. Please use another one!`;
            res.status(400).json({
                status: "fail",
                message,
            });
        } else if (err.name === "ValidationError") {
            const errors = Object.getOwnPropertyNames(err.errors).map(
                (el) => err.errors[el].message
            );
            const message = `Invalid input data. ${errors.join(". ")}`;
            res.status(400).json({
                status: "fail",
                message,
            });
        } else console.log(err);
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    // 1) Check if email and password exist
    if (!username || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide username and password!",
        });
    }

    // 2) Check if user exists and password is correct
    let user;

    user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: "fail",
            message: "Incorrect email or password!",
        });
    }

    // 3) If everything ok, send token to client
    createAuthToken(user, 200, res);
};

exports.logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.updatePassword = async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user._id).select("+password");

    // 2) Check if POSTed password is correct
    if (
        !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
        res.status(401).json({
            status: "fail",
            message: "Provided password is incorrect!",
        });
    }

    // 3) If so, update password
    user.password = req.body.password;
    await user.save();

    // 4) Log user in, send JWT
    createAuthToken(user, 201, res);
};
