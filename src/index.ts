import { config } from "dotenv";
config();

import express from "express";

import path from "path";

import { getVideo } from "./lib/yt";

const PORT = process.env.PORT || "3000";

const app = express();

// Log the current directory for debugging
console.log("Current directory:", __dirname);
console.log("Public directory path:", path.join(__dirname, "public"));
console.log("Views directory path:", path.join(__dirname, "views"));

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
module.exports = app;

