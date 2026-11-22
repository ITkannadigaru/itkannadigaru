"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LessonNavigation({ index, total, onSelect }: {
  index: number;
  total: number;
  onSelect: (index: number) => void;
}) {
  function navigate(next: number) {
    onSelect(next);
    document.getElementById("notes")?.scrollIntoView({ block: "start" });
  }

  return (
    <nav aria-label="Lesson navigation" className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <button type="button" disabled={index === 0} onClick={() => navigate(index - 1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold hover:border-yellow disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={14} />Previous lesson</button>
      <span className="text-xs text-grey">Lesson {index + 1} of {total}</span>
      <button type="button" disabled={index === total - 1} onClick={() => navigate(index + 1)} className="inline-flex items-center gap-2 rounded-full border border-yellow/30 px-3 py-2 text-xs font-semibold text-yellow hover:border-yellow disabled:cursor-not-allowed disabled:opacity-40">Next lesson<ArrowRight size={14} /></button>
    </nav>
  );
}
