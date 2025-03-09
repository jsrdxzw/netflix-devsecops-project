import { useEffect, useRef } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

export default function VideoJSPlayer({
  options,
  onReady,
}: {
  options: any;
  onReady: (player: Player) => void;
}) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    (async function handleVideojs() {
      // Make sure Video.js player is only initialized once
      if (!playerRef.current) {
        // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
        const videoElement = document.createElement("video-js");

        videoRef.current?.appendChild(videoElement);
        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            onReady && onReady(player);
          }
        ));
      } else {
        const player = playerRef.current;
        player.width(options.width);
        player.height(options.height);
      }
    })();
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
