"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ExternalLink, Play, RotateCcw, Sparkles } from "lucide-react";
import { lessons } from "@/lib/python-lessons";
import { useOpenedVideos } from "@/lib/use-opened-videos";
import LessonAssessment from "@/components/LessonAssessment";
import CourseCertificate from "@/components/CourseCertificate";

const NotebookNotes = dynamic(() => import("@/components/NotebookNotes"), {
  loading: () => <p className="text-sm text-grey" role="status">Loading source notebook…</p>,
});

const STORAGE_KEY = "itkannadigaru-python-for-ai-progress-v1";

function Robot({ percent }: { percent: number }) {
  return (
    <div className="relative mt-8" aria-hidden="true">
      <div className="absolute -top-5 z-10 transition-[left] duration-500 motion-reduce:transition-none" style={{ left: `calc(${percent}% - ${percent * 0.32}px)` }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-yellow/60 bg-[#101827] text-lg shadow-lg shadow-yellow/10">🤖</div>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-yellow to-orange-400 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div>
      <div className="mt-3 flex justify-between text-xs text-grey"><span>Start</span><span>Finish</span></div>
    </div>
  );
}

export default function PythonCourse() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState(1);
  const [storageError, setStorageError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { opened, error: openedError, markOpened } = useOpenedVideos("itkannadigaru-python-for-ai-opened-v1");
  const lesson = lessons.find((item) => item.day === activeDay) ?? lessons[0];
  const openedCount = lessons.filter((item) => opened.includes(item.video)).length;
  const percent = Math.round((openedCount / lessons.length) * 100);
  const allComplete = completed.length === lessons.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (!Array.isArray(parsed) || !parsed.every((day) => Number.isInteger(day) && lessons.some((item) => item.day === day))) {
            throw new Error("Invalid saved progress");
          }
          setCompleted([...new Set(parsed as number[])]);
        }
      } catch {
        setStorageError("Saved progress could not be read. Check your browser storage settings; your progress may not persist.");
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleDay(day: number) {
    const next = completed.includes(day) ? completed.filter((item) => item !== day) : [...completed, day];
    setCompleted(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageError("");
    } catch {
      setStorageError("Progress could not be saved on this browser. You can continue, but it may be lost when you leave.");
    }
  }

  return (
    <>
      <main className="course-page min-h-screen">
        <header className="border-b border-white/10">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8" aria-label="Course navigation">
            <Link href="/" className="text-lg font-extrabold"><span className="text-yellow">&lt;/&gt;</span> ITKannadigaru</Link>
            <Link href="/#courses" className="inline-flex items-center gap-2 text-sm text-grey hover:text-white"><ArrowLeft size={16} /> All learning</Link>
          </nav>
        </header>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="bg-circuit-grid absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:py-20">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-yellow">LEARNING PATH / PYTHON FOR AI</p>
              <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Your Python journey<br /><span className="text-yellow">starts here.</span></h1>
              <p className="mt-5 max-w-xl leading-7 text-grey">Watch in Kannada, read the notes, and practise one day at a time. This foundation follows the published Python for AI playlist.</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold"><span className="rounded-full border border-white/10 px-3 py-1.5">🐍 Beginner</span><span className="rounded-full border border-white/10 px-3 py-1.5">{lessons.length} published lessons</span><span className="rounded-full border border-white/10 px-3 py-1.5">Free · Kannada videos</span></div>
              <a href="#lessons" className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-bold text-background hover:brightness-110">Explore lessons <ArrowRight size={17} /></a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-card/80 p-6 sm:p-8">
              <div className="flex items-start justify-between"><div><p className="text-xs font-bold tracking-widest text-grey">VIDEOS OPENED</p><p className="mt-3 text-3xl font-extrabold">{percent}% <span className="text-sm font-normal text-grey">opened</span></p></div><div className="rounded-2xl bg-yellow/10 p-3 text-yellow"><Sparkles size={22} /></div></div>
              <Robot percent={percent} />
              <p className="mt-5 text-sm text-grey">{openedCount} of {lessons.length} videos opened. Your robot moves when you open a video!</p>
              <p className="mt-2 text-xs leading-5 text-grey">Opening a video does not confirm you watched it. Mark lessons complete yourself after watching; {completed.length} of {lessons.length} marked complete. Progress stays on this device and is not synced.</p>
              {storageError && <p role="alert" className="mt-3 text-sm text-red-300">{storageError}</p>}
              {openedError && <p role="alert" className="mt-3 text-sm text-red-300">{openedError}</p>}
              {allComplete && <a href="#certificate" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow">Your certificate is ready <ArrowRight size={16} /></a>}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section id="lessons" className="min-w-0 scroll-mt-6">
            <p className="text-xs font-bold tracking-[0.2em] text-yellow">YOUR CURRICULUM</p>
            <h2 className="mt-3 text-3xl font-extrabold">One day at a time.</h2>
            <p className="mt-3 text-sm leading-6 text-grey">Watch, read the source notebook, check your understanding, then build the assignment.</p>
            <div className="mt-7 space-y-3">
              {lessons.map((item) => {
                const done = completed.includes(item.day);
                return (
                  <article key={item.day} className={`rounded-2xl border p-5 transition ${activeDay === item.day ? "border-yellow/50 bg-yellow/[0.04]" : "border-white/10 bg-card/50"}`}>
                    <div className="flex items-start gap-4"><a href={`https://www.youtube.com/watch?v=${item.video}&list=PLb7POK22N8U0`} onClick={() => markOpened(item.video)} onAuxClick={(event) => { if (event.button === 1) markOpened(item.video); }} target="_blank" rel="noopener noreferrer" aria-label={`Watch day ${item.day}: ${item.title} on YouTube`} className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-cover bg-center sm:w-36" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${item.video}/hqdefault.jpg)` }}><span className="absolute inset-0 flex items-center justify-center bg-black/20"><Play size={24} className="text-white" fill="currentColor" /></span></a><div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-wider text-grey">Day {item.day}{done ? " · Completed" : opened.includes(item.video) ? " · Opened" : ""}</p><h3 className="mt-1 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-grey">{item.summary}</p></div><div className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:flex ${done ? "bg-green-500/15 text-green-400" : "bg-white/5 text-yellow"}`}>{done ? <Check size={18} /> : String(item.day).padStart(2, "0")}</div></div>
                    <div className="mt-4 flex flex-wrap gap-2 pl-0 sm:pl-14">
                      <a href={`https://www.youtube.com/watch?v=${item.video}&list=PLb7POK22N8U0`} onClick={() => markOpened(item.video)} onAuxClick={(event) => { if (event.button === 1) markOpened(item.video); }} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 text-xs font-bold text-background hover:brightness-110"><Play size={14} /> Watch video <span className="sr-only">for day {item.day}</span></a>
                      <a href="#notes" onClick={() => setActiveDay(item.day)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:border-yellow"><BookOpen size={14} /> Read notes <span className="sr-only">for day {item.day}</span></a>
                      <a href="#assessment" onClick={() => setActiveDay(item.day)} className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 px-4 py-2 text-xs font-semibold text-purple-300 hover:border-purple-300">Quiz & assignment <span className="sr-only">for day {item.day}</span></a>
                      <button type="button" disabled={!loaded} onClick={() => toggleDay(item.day)} aria-pressed={done} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-grey hover:text-white disabled:opacity-50">{done ? <RotateCcw size={14} /> : <CheckCircle2 size={14} />}{done ? "Undo" : "Mark complete"} <span className="sr-only">day {item.day}</span></button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <aside id="notes" className="min-w-0 scroll-mt-6 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-card/70">
              <div className="border-b border-white/10 bg-gradient-to-br from-blue-950/70 to-yellow/5 p-7 sm:p-8">
                <p className="text-xs font-bold tracking-[0.2em] text-yellow">BEGINNER NOTES / DAY {lesson.day}</p>
                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{lesson.title}</h2>
                <p className="mt-3 leading-7 text-grey">{lesson.summary}</p>
                <a href={`https://www.youtube.com/watch?v=${lesson.video}&list=PLb7POK22N8U0`} onClick={() => markOpened(lesson.video)} onAuxClick={(event) => { if (event.button === 1) markOpened(lesson.video); }} target="_blank" rel="noopener noreferrer" aria-label={`Watch day ${lesson.day}: ${lesson.title} on YouTube`} className="group relative mt-6 flex aspect-video max-w-md items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${lesson.video}/hqdefault.jpg)` }}>
                  <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/40" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow text-background shadow-lg"><Play size={22} fill="currentColor" /></span>
                </a>
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-grey"><span className="rounded-lg border border-white/10 bg-background/70 px-3 py-2">LEARN</span><ArrowRight size={14} /><span className="rounded-lg border border-white/10 bg-background/70 px-3 py-2">TRY</span><ArrowRight size={14} /><span className="rounded-lg border border-yellow/20 bg-yellow/5 px-3 py-2 text-yellow">BUILD</span></div>
              </div>
              <div className="space-y-7 p-7 sm:p-8">
                <div><h3 className="font-bold">The idea, simply explained</h3><p className="mt-3 leading-7 text-grey">{lesson.explanation}</p></div>
                <div><div className="flex items-center justify-between"><h3 className="font-bold">Try an example</h3><span className="font-mono text-xs text-yellow">PYTHON</span></div><pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#070b14] p-5 text-sm leading-7 text-[#e2e8f0]"><code>{lesson.code}</code></pre></div>
                <div className="rounded-2xl border border-yellow/20 bg-yellow/5 p-5"><h3 className="font-bold text-yellow">Your turn ✨</h3><p className="mt-2 text-sm leading-6 text-grey">{lesson.practice}</p></div>
                <NotebookNotes key={`notebook-${lesson.day}`} source={lesson.source} />
                <div id="assessment" className="scroll-mt-6">
                  <LessonAssessment key={lesson.day} day={lesson.day} />
                </div>
                <div className="flex flex-wrap gap-4 text-sm"><a href={`https://www.youtube.com/watch?v=${lesson.video}&list=PLb7POK22N8U0`} onClick={() => markOpened(lesson.video)} onAuxClick={(event) => { if (event.button === 1) markOpened(lesson.video); }} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-yellow">Watch day {lesson.day} <ExternalLink size={14} /></a>{lesson.source && <a href={lesson.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-grey hover:text-white">Explore related notebook <ExternalLink size={14} /></a>}</div>
                <p className="text-xs leading-5 text-grey">These short notes are a learning companion to the video. Some examples are illustrative and may differ from the lesson demonstration.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <CourseCertificate title="Python for AI" count={lessons.length} complete={allComplete} />
    </>
  );
}
