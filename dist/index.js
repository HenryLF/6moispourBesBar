"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const yt_1 = require("./lib/yt");
const meta_1 = __importDefault(require("./meta"));
const PORT = process.env.PORT || "3000";
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cors_1.default)());
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.get("/", async (_, res) => {
    const playlist = await (0, yt_1.getVideo)();
    if (!playlist.videos.length) {
        res.render("empty_playlist", {
            meta: meta_1.default,
            playlist,
        });
        return;
    }
    res.render("index", {
        meta: meta_1.default,
        playlist,
        player: "/player/iFrame.js",
    });
});
app.get("/background", async (_, res) => {
    const playlist = await (0, yt_1.getVideo)();
    if (!playlist.videos.length) {
        res.render("empty_playlist", {
            meta: meta_1.default,
            playlist,
        });
        return;
    }
    res.render("index", {
        meta: meta_1.default,
        playlist,
        player: "/player/videoTag.js",
    });
});
app.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
});
module.exports = app;
