"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const openai_config_js_1 = require("../config/openai-config.js");
const openai_1 = require("openai");
const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "user not registered or token malfunctioned" });
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const config = (0, openai_config_js_1.configureOpenAI)();
        const openai = new openai_1.OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "qpt-3.5-turbo",
            messages: chats
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Something went wrong" });
    }
};
exports.generateChatCompletion = generateChatCompletion;
const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("permissions didnt match");
        }
        return res.status(200).json({ message: "ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("something went wrong");
    }
};
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = async (req, res, next) => {
    try {
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("permissions didnt match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "ok" });
    }
    catch (error) {
        console.log(error);
        return res.status(404).send("something went wrong");
    }
};
exports.deleteChats = deleteChats;
//# sourceMappingURL=chat-controllers.js.map