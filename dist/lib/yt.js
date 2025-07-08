"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = getVideo;
const googleapis_1 = require("googleapis");
const { YOUTUBE_API_KEY, PLAYLIST_ID } = process.env;
const youtubeAPI = googleapis_1.google.youtube({
    version: "v3",
    auth: YOUTUBE_API_KEY,
});
async function getVideo() {
    console.log(YOUTUBE_API_KEY, PLAYLIST_ID);
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
    console.log((await youtubeAPI.videos.list({ part: ["player"], id: [videoIds[0]] })).data.items);
    return videoIds;
}
