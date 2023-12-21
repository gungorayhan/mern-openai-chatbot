"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_js_1 = require("../controllers/user-controllers.js");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/", user_controllers_js_1.getAllUsers);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map