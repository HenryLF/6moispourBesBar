import { google } from "googleapis";

const { YOUTUBE_API_KEY, PLAYLIST_ID } = process.env;
const youtubeAPI = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY,
});

export async function getVideo() {
  const playlist = await youtubeAPI.playlistItems.list({
    part: ["snippet"],
    playlistId: PLAYLIST_ID!,
    maxResults: 50,
  });

  if (playlist.status != 200) {
    console.error(`api error ${playlist.status}`, playlist);
    return [];
  }

  const videoIds = playlist.data.items?.map(
    (it) => it.snippet?.resourceId?.videoId
  ) as string[];

  return videoIds;
}