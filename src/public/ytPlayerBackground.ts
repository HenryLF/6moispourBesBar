import YouTubePlayer from "youtube-player";

function createSlavePlayer(videoId: string, master: any): Promise<any> {
  return new Promise((resolve) => {
    const background = document.getElementById("background");
    const slave = YouTubePlayer(background || "background", {
      videoId,
      playerVars: {
        modestbranding: 1,
        autoplay: 0,
        controls: 0,
      },
    });

    slave.on("ready", () => {
      slave.mute();
      const typedMaster = master as typeof slave;
      typedMaster.getPlayerState().then((state) => {
        if (state === 1) {
          slave?.playVideo();
        }
      });
      typedMaster.getCurrentTime().then((time) => {
        slave?.seekTo(time, true);
      });

      resolve(slave);
    });
  });
}

export function initPlayer(el: HTMLElement, videoId: string) {
  const master = YouTubePlayer(el, {
    videoId,
    playerVars: {
      modestbranding: 1,
      autoplay: 0,
    },
  });

  const parent = document.getElementById(el.id)?.parentElement;
  let slave: typeof master | null = null;

  createSlavePlayer(videoId, master).then((s) => {
    slave = s;
  });

  master.on("ready", () => {
    master.mute();
    parent?.dispatchEvent(
      new CustomEvent("player-ready", {
        detail: {
          play: master.playVideo,
          pause: master.pauseVideo,
          load: (id: string) => {
            console.log("hey")
            slave?.loadVideoById(id);
            slave?.playVideo();
          },
        },
      })
    );
  });

  master.on("error", () => {
    if (slave) slave.destroy();
    parent?.dispatchEvent(
      new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
    );
    master.destroy();
  });

  master.on("stateChange", ({ data }) => {
    switch (data) {
      case 0: // Ended
        if (slave) slave.destroy();
        parent?.dispatchEvent(
          new CustomEvent("video-ended", { detail: initPlayer(el, videoId) })
        );
        break;

      case 1: // Playing
        slave?.playVideo();
        break;

      case 2: // Paused
        slave?.pauseVideo();
        break;
    }
  });
}
