import YouTubePlayer from "youtube-player";

export function initPlayer(el: HTMLElement, videoId: string) {
  const player = YouTubePlayer(el, {
    videoId,
    playerVars: {
      modestbranding: 1,
      autoplay: 0,
    },
  });

  const parent = document.getElementById(el.id)?.parentElement;
  player.on("ready", () => {
    player.mute();
    parent?.dispatchEvent(
      new CustomEvent("player-ready", {
        detail: {
          play: player.playVideo,
          pause: player.pauseVideo,
        },
      })
    );
  });

  player.on("error", () => {
    parent?.dispatchEvent(
      new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
    );
    player.destroy();
  });

  player.on("stateChange", ({ data }) => {
    switch (data) {
      case 0:
        parent?.dispatchEvent(
          new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
        );
        break;
    }
  });
}
