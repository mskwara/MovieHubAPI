const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must have username."],
        unique: [true, "This username already exists."]
    },
    description: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "User must have a password"],
        select: false,
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        select: false,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.idNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (
    providedPassword,
    hashedPassword
) {
    return await bcrypt.compare(providedPassword, hashedPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
