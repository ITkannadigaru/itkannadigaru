"use client";

import { useEffect, useState } from "react";

function readOpened(key: string): string[] {
  const saved = window.localStorage.getItem(key);
  if (!saved) return [];
  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
    throw new Error("Invalid saved video progress");
  }
  return [...new Set(parsed)];
}

export function useOpenedVideos(key: string) {
  const [opened, setOpened] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setOpened(readOpened(key));
      } catch {
        setError("Video progress could not be read from this browser.");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [key]);

  function markOpened(videoId: string) {
    try {
      const next = [...new Set([...readOpened(key), videoId])];
      window.localStorage.setItem(key, JSON.stringify(next));
      setOpened(next);
      setError("");
    } catch {
      setOpened((current) => [...new Set([...current, videoId])]);
      setError("Video progress could not be saved in this browser and may be lost.");
    }
  }

  return { opened, error, markOpened };
}
