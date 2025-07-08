import { config } from "dotenv";
config();

import express from "express";

import path from "path";

import { getVideo } from "./lib/yt";
const { PORT } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (_, res) => {
  const videos = await getVideo();
  res.render("index", {
    videos,
  });
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
