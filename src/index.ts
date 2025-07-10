import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import path from "path";

import { getVideo } from "./lib/yt";
import meta from "./meta";

const PORT = process.env.PORT || "3000";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (_, res) => {
  const playlist = await getVideo();
  if (!playlist.videos.length) {
    res.render("empty_playlist", {
      meta,
      playlist,
    });
    return;
  }
  res.render("index", {
    meta,
    playlist,
    player: "/ytPlayer.js",
  });
});

app.get("/background", async (_, res) => {
  const playlist = await getVideo();
  if (!playlist.videos.length) {
    res.render("empty_playlist", {
      meta,
      playlist,
    });
    return;
  }
  res.render("index", {
    meta,
    playlist,
    player: "/ytPlayerBackground.js",
  });
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
module.exports = app;
