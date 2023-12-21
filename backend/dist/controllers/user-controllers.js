"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt");
const token_manager_1 = require("../utils/token-manager");
const constants_1 = require("../utils/constants");
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        return res.status(200).json({
            message: "OK",
            users
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
exports.getAllUsers = getAllUsers;
const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.find({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = await new User_1.default({ name, email, password: hashedPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            causes: error.message
        });
    }
};
exports.userSignup = userSignup;
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("user not registered");
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.cookie(constants_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            message: "OK",
            name: user.name,
            email: user.email
        });
    }
    catch (error) {
        console.log(error);
        console.log(error);
        return res.status(200).json({
            message: "ERROR",
            causes: error.message
        });
    }
};
exports.userLogin = userLogin;
//# sourceMappingURL=user-controllers.js.map