"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = getVideo;
const googleapis_1 = require("googleapis");
const blob_1 = require("@vercel/blob");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const PLAYLIST_ID = process.env.PLAYLIST_ID ?? "";
const REFRESH_DELAY = 1_200_000; //20 minutes
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
    await (0, blob_1.put)(PLAYLIST_ID, blob, {
        access: "public",
        allowOverwrite: true,
    });
}
async function getPlaylist() {
    const storedBlobs = await (0, blob_1.list)();
    const blob = storedBlobs.blobs.find((item) => (item.pathname = PLAYLIST_ID));
    if (!blob)
        return { timestamp: Date.now(), videos: [] };
    const playlist = await fetch(blob?.url);
    return playlist.json();
}
async function getVideoFromAPI() {
    let videoIds = [];
    let playlist;
    try {
        playlist = await youtubeAPI.playlistItems.list({
            part: ["snippet"],
            playlistId: PLAYLIST_ID,
            maxResults: 50,
        });
    }
    catch (e) {
        console.error(`api error ${e}`);
        return videoIds;
    }
    videoIds.push(...playlist.data.items?.map((it) => it.snippet?.resourceId?.videoId));
    while (playlist.data.nextPageToken) {
        try {
            playlist = await youtubeAPI.playlistItems.list({
                part: ["snippet"],
                playlistId: PLAYLIST_ID,
                maxResults: 50,
                pageToken: playlist.data.nextPageToken,
            });
        }
        catch (e) {
            console.error(`api error ${e}`);
            return videoIds;
        }
        videoIds.push(...playlist.data.items?.map((it) => it.snippet?.resourceId?.videoId));
    }
    return videoIds;
}
async function getVideo() {
    const buffer = await getPlaylist();
    if (buffer.videos.length && Date.now() - buffer.timestamp < REFRESH_DELAY) {
        return { videos: buffer.videos, playlistId: PLAYLIST_ID };
    }
    const videos = await getVideoFromAPI();
    videos.length && storePlaylist(videos);
    return { videos, playlistId: PLAYLIST_ID };
}
