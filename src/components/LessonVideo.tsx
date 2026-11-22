"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";

const REMINDER_KEY = "itkannadigaru-youtube-reminder-seen";

export default function LessonVideo({ videoId, title, playlistId, loaded, onLoad, onOpenYouTube }: {
  videoId: string;
  title: string;
  playlistId: string;
  loaded: boolean;
  onLoad: () => void;
  onOpenYouTube: () => void;
}) {
  const [showReminder, setShowReminder] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const reminderChecked = useRef(false);
  const reducedMotion = useReducedMotion();
  const url = `https://www.youtube.com/watch?v=${videoId}&list=${playlistId}`;

  useEffect(() => {
    if (!loaded || reminderChecked.current) return;
    reminderChecked.current = true;
    try {
      if (window.sessionStorage.getItem(REMINDER_KEY) === "yes") return;
      window.sessionStorage.setItem(REMINDER_KEY, "yes");
    } catch {
      setStorageUnavailable(true);
    }
    setShowReminder(true);
  }, [loaded]);

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
      <div aria-live="polite">
        {showReminder && <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          role="region"
          aria-label="Friendly YouTube reminder"
          className="relative mt-4 rounded-2xl border border-yellow/30 bg-yellow/5 p-4 pr-12"
        >
          <button type="button" onClick={() => setShowReminder(false)} aria-label="Dismiss YouTube reminder" className="absolute right-3 top-3 rounded-full p-2 text-grey hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-yellow"><X size={18} /></button>
          <p className="text-sm font-bold text-yellow">Enjoying the lesson? 👀</p>
          <p className="mt-2 text-sm leading-6 text-grey">If this video helped, a like and a subscription would make our little robot do a happy dance! No pressure—keep learning either way.</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold">
            <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full bg-yellow px-4 py-2 text-background">Like on YouTube ↗</a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full border border-yellow/30 px-4 py-2 text-yellow">Subscribe on YouTube ↗</a>
          </div>
          {storageUnavailable && <p className="mt-3 text-xs text-orange-200">Browser session storage is unavailable, so this reminder may appear again.</p>}
        </motion.div>}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
        <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Like on YouTube ↗</a>
        <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Dislike on YouTube ↗</a>
        <a href={`${url}#comments`} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Comment on YouTube ↗</a>
        <a href={url} onClick={onOpenYouTube} onAuxClick={(event) => { if (event.button === 1) onOpenYouTube(); }} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Share on YouTube ↗</a>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3 py-2 hover:border-yellow">Subscribe on YouTube ↗</a>
      </div>
      <p className="mt-2 text-xs leading-5 text-grey">These links open the video on YouTube; choose Like, Dislike, Comment or Share there. YouTube controls where comments appear. Subscribing and signing in are optional.</p>
    </section>
  );
}
