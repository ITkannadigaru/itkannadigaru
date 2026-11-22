"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { loadYouTubeIframeApi, type YouTubePlayer } from "@/lib/youtube-iframe-api";
import { createPlaybackTimer } from "@/lib/playback-timer";

export default function EmbeddedLessonPlayer({ videoId, title, youtubeUrl, onOpenYouTube }: {
  videoId: string;
  title: string;
  youtubeUrl: string;
  onOpenYouTube: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let player: YouTubePlayer | undefined;
    let readyTimer: number | undefined;
    const playbackTimer = createPlaybackTimer(() => {
      if (!cancelled) setPrompt(true);
    });

    const frame = document.createElement("iframe");
    const params = new URLSearchParams({ autoplay: "0", playsinline: "1", rel: "0", enablejsapi: "1", origin: window.location.origin });
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
    frame.title = `YouTube lesson: ${title}`;
    frame.className = "h-full w-full";
    frame.allow = "encrypted-media; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    container.replaceChildren(frame);

    loadYouTubeIframeApi().then((api) => {
      if (cancelled) return;
      readyTimer = window.setTimeout(() => { if (!cancelled) setApiError(true); }, 15000);
      player = new api.Player(frame, {
        events: {
          onReady: (event) => {
            if (cancelled) return;
            window.clearTimeout(readyTimer);
            setApiError(false);
            playbackTimer.setState(event.target.getPlayerState());
          },
          onStateChange: (event) => { if (!cancelled) playbackTimer.setState(event.data); },
        },
      });
    }).catch(() => {
      if (!cancelled) setApiError(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(readyTimer);
      playbackTimer.dispose();
      player?.destroy();
      container.replaceChildren();
    };
  }, [videoId, title]);

  return (
    <>
      <div ref={containerRef} className="aspect-video min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-background" />
      {apiError && <p role="status" className="mt-3 text-xs leading-5 text-orange-200">The playback reminder is unavailable. You can still watch here or open the video on YouTube.</p>}
      <div aria-live="polite">
        {prompt && <div role="region" aria-label="Continue on YouTube" className="relative mt-3 rounded-2xl border border-yellow/30 bg-yellow/5 p-4 pr-12">
          <button type="button" onClick={() => setPrompt(false)} aria-label="Dismiss continue on YouTube prompt" className="absolute right-3 top-3 rounded-full p-2 text-grey hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-yellow"><X size={18} /></button>
          <p className="text-sm font-bold text-yellow">Want to continue on YouTube?</p>
          <p className="mt-2 text-xs leading-5 text-grey">You can continue there or keep watching here—your choice. YouTube may start the video from the beginning.</p>
          <a href={youtubeUrl} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-yellow">Continue on YouTube <ExternalLink size={14} /></a>
        </div>}
      </div>
    </>
  );
}
