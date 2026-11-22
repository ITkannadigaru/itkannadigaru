"use client";

import { useEffect, useState } from "react";
import { readLessonResume, resumeKey } from "@/lib/course-resume";

export function useLessonResume(slug: string, videoIds: readonly string[]) {
  const [activeId, setActiveId] = useState(videoIds[0]);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = readLessonResume(window.localStorage, slug, videoIds);
        if (saved) {
          setActiveId(saved.videoId);
          setResumeId(saved.videoId);
        }
      } catch {
        setError("Your last lesson could not be restored. Select a lesson to continue.");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [slug, videoIds]);

  function selectLesson(videoId: string) {
    if (!videoIds.includes(videoId)) throw new Error(`Unknown lesson: ${videoId}`);
    setActiveId(videoId);
    setResumeId(videoId);
    try {
      window.localStorage.setItem(resumeKey(slug), JSON.stringify({ videoId, updatedAt: Date.now() }));
      setError("");
    } catch {
      setError("Your last lesson could not be saved. Continue learning may reset when you leave.");
    }
  }

  return { activeId, resumeId, error, selectLesson };
}
