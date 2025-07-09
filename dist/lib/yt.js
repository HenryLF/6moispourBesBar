"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = getVideo;
const googleapis_1 = require("googleapis");
const blob_1 = require("@vercel/blob");
const { YOUTUBE_API_KEY, PLAYLIST_ID, BLOB_URL } = process.env;
const REFRESH_DELAY = 1200000; //20 minutes
const youtubeAPI = googleapis_1.google.youtube({
    version: "v3",
    auth: YOUTUBE_API_KEY,
});
async function storePlaylist(videos) {
    const blob = new Blob([
        JSON.stringify({
            videos,
            timestamp: Date.now(),
        }),
    ], { type: "application/json" });
    await (0, blob_1.put)("buffered_playlist", blob, {
        access: "public",
        allowOverwrite: true,
    });
}
async function getPlaylist() {
    const k = await fetch(BLOB_URL);
    return k.json();
}
async function getVideoFromAPI() {
    const playlist = await youtubeAPI.playlistItems.list({
        part: ["snippet"],
        playlistId: PLAYLIST_ID,
        maxResults: 50,
    });
    if (playlist.status != 200) {
        console.error(`api error ${playlist.status}`, playlist);
        return [];
    }
    const videoIds = playlist.data.items?.map((it) => it.snippet?.resourceId?.videoId);
    return videoIds;
}
async function getVideo() {
    const buffer = await getPlaylist();
    if (Date.now() - buffer.timestamp < REFRESH_DELAY) {
        return buffer.videos;
    }
    const videos = await getVideoFromAPI();
    storePlaylist(videos);
    return videos;
}
