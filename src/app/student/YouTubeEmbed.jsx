"use client";
import { useEffect } from "react";

export default function YouTubeEmbed({ videoId, title }) {
  useEffect(() => {
    // Dynamically load lite-youtube-embed script
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.3/src/lite-yt-embed.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Load CSS for lite-youtube-embed
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.3/src/lite-yt-embed.css";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <lite-youtube
      videoid={videoId}
      videotitle={title}
      params="controls=1&modestbranding=1&rel=0&enablejsapi=1&showinfo=0"
      style={{
        maxWidth: "100%",
        width: "720px",
        aspectRatio: "16/9",
        display: "block",
        margin: "0 auto",
      }}
    ></lite-youtube>
  );
}
