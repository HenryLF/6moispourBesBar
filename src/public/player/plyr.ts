import Plyr from "plyr";

export function initPlayer(el: HTMLElement, videoId: string) {
  console.log(el, videoId);
  const player = new Plyr(el.id);

  player.source = {
    type: "video",
    sources: [
      {
        src: videoId,
        provider: "youtube",
      },
    ],
  };

  player.on("ready", () => {
    console.log("ready");
    const parentElement = document.getElementById(el.id)?.parentElement;
    parentElement?.dispatchEvent(
      new CustomEvent("player-ready", {
        detail: {
          play: player.play,
          pause: player.pause,
        },
      })
    );
  });
  player.on("error", (event) => {
    console.error("Player error:", event.detail);
  });

  player.on("statechange", (event) => {
    console.log("Player state:", event.detail);
  });
}
