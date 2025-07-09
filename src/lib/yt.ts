import { google } from "googleapis";
import { put } from "@vercel/blob";

const { YOUTUBE_API_KEY, PLAYLIST_ID, BLOB_URL } = process.env;

const REFRESH_DELAY = 1_200_000; //20 minutes

const youtubeAPI = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY,
});

type BufferedPlaylist = {
  videos: string[];
  timestamp: number;
};

async function storePlaylist(videos: string[]) {
  const blob = new Blob(
    [
      JSON.stringify({
        videos,
        timestamp: Date.now(),
      }),
    ],
    { type: "application/json" }
  );
  await put("buffered_playlist", blob, {
    access: "public",
    allowOverwrite: true,
  });
}

async function getPlaylist() {
  const k = await fetch(BLOB_URL!);
  return k.json() as Promise<BufferedPlaylist>;
}

async function getVideoFromAPI() {
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

export async function getVideo() {
  const buffer = await getPlaylist();

  if (Date.now() - buffer.timestamp < REFRESH_DELAY) {
    return buffer.videos;
  }

  const videos = await getVideoFromAPI();
  storePlaylist(videos);
  return videos;
}
