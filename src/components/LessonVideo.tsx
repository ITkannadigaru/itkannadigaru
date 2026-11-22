"use client";

import { ExternalLink, Play } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";

export default function LessonVideo({ videoId, title, playlistId, loaded, onLoad, onOpenYouTube }: {
  videoId: string;
  title: string;
  playlistId: string;
  loaded: boolean;
  onLoad: () => void;
  onOpenYouTube: () => void;
}) {
  const url = `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`;
  return (
    <section id="video-player" className="mt-6 scroll-mt-6" aria-label="Lesson video">
      <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-background">
        {loaded ? <iframe
          key={videoId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&playsinline=1&rel=0`}
          title={`YouTube lesson: ${title}`}
          className="h-full w-full"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        /> : <button type="button" onClick={onLoad} aria-label={`Load video player: ${title}`} className="relative flex h-full w-full items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }}>
          <span className="absolute inset-0 bg-black/30" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-3 text-sm font-bold text-background"><Play size={20} />Load YouTube player</span>
        </button>}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-5 text-grey">{loaded ? "Press Play in the YouTube player. No automatic playback." : "Watch here, then read and practise below."}</p>
        <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-yellow">Open on YouTube<ExternalLink size={14} /></a>
      </div>
      <p className="mt-2 text-xs leading-5 text-grey">If embedding is unavailable or blocked, use Open on YouTube. YouTube validates views; loading this player does not guarantee a view or mark the lesson complete.</p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
        <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Like on YouTube ↗</a>
        <a href={`${url}#comments`} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Comment on YouTube ↗</a>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Subscribe on YouTube ↗</a>
      </div>
      <p className="mt-2 text-xs leading-5 text-grey">These optional actions open YouTube. No subscription or sign-in is required to learn here.</p>
    </section>
  );
}
