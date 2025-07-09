"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const yt_1 = require("./lib/yt");
const PORT = process.env.PORT || "3000";
const app = (0, express_1.default)();
// Log the current directory for debugging
console.log("Current directory:", __dirname);
console.log("Public directory path:", path_1.default.join(__dirname, "public"));
console.log("Views directory path:", path_1.default.join(__dirname, "views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.get("/", async (_, res) => {
    const videos = await (0, yt_1.getVideo)();
    res.render("index", {
        videos,
    });
});
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
});
module.exports = app;
