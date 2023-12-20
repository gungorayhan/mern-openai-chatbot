"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.get("/hello", (req, res) => {
    console.log("Hello OpenAI");
    res.send("Hello OpenAI");
});
app.listen(5000, () => {
    console.log("Server Open");
});
//# sourceMappingURL=index.js.map