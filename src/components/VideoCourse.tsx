"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, Play, Sparkles } from "lucide-react";
import type { catalog } from "@/lib/catalog";
import type { CourseLesson, roadmaps } from "@/lib/course-lessons";
import type { SourceDocument } from "@/components/SourceNotes";
import LessonAssessment from "@/components/LessonAssessment";
import CourseCertificate from "@/components/CourseCertificate";
import { useOpenedVideos } from "@/lib/use-opened-videos";
import { useLessonResume } from "@/lib/use-lesson-resume";
import LessonSearch from "@/components/LessonSearch";
import LessonNavigation from "@/components/LessonNavigation";
import LessonVideo from "@/components/LessonVideo";
import CourseProject from "@/components/CourseProject";

type Course = (typeof catalog)[number];
type Props = { course: Course; lessons: CourseLesson[]; documents: SourceDocument[]; importedAt: string; roadmap: (typeof roadmaps)[string] };
const SourceNotes = dynamic(() => import("@/components/SourceNotes"), {
  loading: () => <p role="status" className="text-sm text-grey">Loading source notes…</p>,
});

export default function VideoCourse({ course, lessons, documents, importedAt, roadmap }: Props) {
  const { opened, error, markOpened } = useOpenedVideos(`itkannadigaru-opened-${course.playlistId}-v1`);
  const openedCount = course.videos.filter((video) => opened.includes(video.id)).length;
  const percent = course.videos.length ? Math.round((openedCount / course.videos.length) * 100) : 0;
  const videoIds = useMemo(() => lessons.map((lesson) => lesson.id), [lessons]);
  const resume = useLessonResume(course.slug, videoIds);
  const { activeId } = resume;
  const [query, setQuery] = useState("");
  const [playerId, setPlayerId] = useState<string | null>(null);
  const notesRef = useRef<HTMLElement>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [completionError, setCompletionError] = useState("");
  const completionKey = `itkannadigaru-completed-${course.playlistId}-v1`;
  const active = lessons.find((lesson) => lesson.id === activeId)!;
  const activeIndex = lessons.indexOf(active);
  const search = query.trim().toLocaleLowerCase();
  const visibleLessons = lessons.filter((lesson) => `${lesson.label} ${lesson.title} ${lesson.explanation}`.toLocaleLowerCase().includes(search));
  const allComplete = lessons.every((lesson) => completed.includes(lesson.id));

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(completionKey);
        if (saved) {
          const value: unknown = JSON.parse(saved);
          if (!Array.isArray(value) || !value.every((id) => typeof id === "string" && lessons.some((lesson) => lesson.id === id))) {
            throw new Error("Invalid saved completion");
          }
          setCompleted([...new Set<string>(value)]);
        }
      } catch {
        setCompletionError("Saved completion could not be read. You can mark your lessons again below.");
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [completionKey, lessons]);

  function selectLesson(id: string) {
    resume.selectLesson(id);
    if (id !== activeId) setPlayerId(null);
    if (notesRef.current) notesRef.current.scrollTop = 0;
  }

  function watchLesson(id: string) {
    selectLesson(id);
    setPlayerId(id);
    markOpened(id);
  }

  function openYouTube(id: string) {
    selectLesson(id);
    setPlayerId(null);
    markOpened(id);
  }

  function toggleComplete(id: string) {
    const next = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(next);
    try {
      localStorage.setItem(completionKey, JSON.stringify(next));
      setCompletionError("");
    } catch {
      setCompletionError("Completion could not be saved in this browser and may be lost.");
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
      <section className="border-b border-white/5 bg-gradient-to-br from-blue-950/30 to-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
          <div><p className="text-xs font-bold tracking-[0.2em] text-yellow">{course.label} / LEARNING PATH</p><h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{course.title}</h1><p className="mt-5 max-w-xl leading-7 text-grey">{course.desc} Watch in Kannada, read, practise and build one lesson at a time.</p><p className="mt-4 text-sm text-grey">{course.videos.length} lessons · Notes · Quizzes · Assignments</p>
            <a href={resume.resumeId ? "#notes" : "#lessons"} onClick={resume.resumeId ? () => selectLesson(activeId) : undefined} className="mt-6 inline-flex rounded-full bg-yellow px-6 py-3 text-sm font-bold text-background">{resume.resumeId ? `Continue learning · ${active.label}` : "Explore lessons"}</a>
            <a href="#course-project" className="ml-4 mt-4 inline-block text-sm font-bold text-yellow underline underline-offset-4">Explore final project</a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-card/80 p-6 sm:p-8">
            <div className="flex items-start justify-between"><div><p className="text-xs font-bold tracking-widest text-grey">VIDEOS OPENED</p><p className="mt-3 text-3xl font-extrabold">{percent}% <span className="text-sm font-normal text-grey">opened</span></p></div><div className="rounded-2xl bg-yellow/10 p-3 text-yellow"><Sparkles size={22} /></div></div>
            <div className="relative mt-8"><div className="absolute -top-5 z-10 transition-[left] duration-500 motion-reduce:transition-none" style={{ left: `calc(${percent}% - ${percent * 0.32}px)` }} aria-hidden="true"><div className="flex h-8 w-8 items-center justify-center rounded-xl border border-yellow/60 bg-[#101827] text-lg">🤖</div></div><div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-yellow to-orange-400 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div></div>
            <p className="mt-6 text-sm text-grey">{openedCount} of {course.videos.length} videos opened.</p><p className="mt-2 text-xs leading-5 text-grey">Opening a video doesn&apos;t confirm you watched it. Progress is saved in this browser on this device.</p>
            <p className="mt-3 text-sm text-grey">{completed.length} of {lessons.length} lessons marked complete by you.</p>
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
            {completionError && <p role="alert" className="mt-3 text-sm text-red-300">{completionError}</p>}
            {resume.error && <p role="alert" className="mt-3 text-sm text-orange-200">{resume.error}</p>}
            {allComplete && <a href="#certificate" className="mt-4 inline-block text-sm font-bold text-yellow">Your certificate is ready ↓</a>}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8" aria-labelledby="roadmap-title">
        <p className="text-xs font-bold tracking-[0.2em] text-yellow">BEFORE YOU START</p>
        <h2 id="roadmap-title" className="mt-3 text-2xl font-extrabold">Your learning roadmap</h2>
        <p className="mt-3 text-sm leading-6 text-grey"><strong className="text-white">Prerequisites:</strong> {roadmap.prerequisites}</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{roadmap.stages.map((stage, index) => <li key={stage} className="rounded-2xl border border-yellow/20 bg-yellow/5 p-4"><span className="text-xs font-bold text-yellow">STEP {index + 1}</span><p className="mt-2 text-sm font-semibold">{stage}</p></li>)}</ol>
        <p className="mt-5 rounded-2xl border border-orange-300/20 bg-orange-300/5 p-4 text-sm leading-6 text-orange-100">{roadmap.safety}</p>
      </section>
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section id="lessons" className="min-w-0">
          <p className="text-xs font-bold tracking-[0.2em] text-yellow">YOUR CURRICULUM</p>
          <h2 className="mt-3 text-3xl font-extrabold">Learn. Practise. Build.</h2>
          <p className="mt-3 text-sm leading-6 text-grey">Original beginner companions follow the published lesson topics. Related GitHub modules are linked where available; they are not video transcripts.</p>
          <LessonSearch query={query} onChange={setQuery} count={visibleLessons.length} total={lessons.length} />
          <div className="mt-7 space-y-4">{visibleLessons.map((lesson) => {
            const done = completed.includes(lesson.id);
            const url = `https://www.youtube.com/watch?v=${lesson.id}&list=${course.playlistId}`;
            return <article key={lesson.id} className={`rounded-2xl border bg-card/60 p-5 ${activeId === lesson.id ? "border-yellow/50" : "border-white/10"}`}>
              <div className="flex items-start gap-4">
                <a href={url} onClick={() => openYouTube(lesson.id)} onAuxClick={(event) => { if (event.button === 1) openYouTube(lesson.id); }} target="_blank" rel="noopener noreferrer" aria-label={`Open on YouTube: ${lesson.label}: ${lesson.title}`} className="relative aspect-video w-28 shrink-0 rounded-xl bg-cover bg-center sm:w-36" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${lesson.id}/hqdefault.jpg)` }}><span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20"><Play size={24} fill="currentColor" /></span></a>
                <div className="min-w-0 break-words"><p className="text-xs font-bold uppercase tracking-wider text-yellow">{lesson.label}{done ? " · COMPLETED" : opened.includes(lesson.id) ? " · OPENED" : ""}</p><h3 className="mt-2 text-sm font-bold leading-6">{lesson.title}</h3></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="#video-player" onClick={() => watchLesson(lesson.id)} className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 text-xs font-bold text-background"><Play size={14} />Watch video<span className="sr-only"> {lesson.label}</span></a>
                <a href="#notes" onClick={() => selectLesson(lesson.id)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold"><BookOpen size={14} />Read notes<span className="sr-only"> {lesson.label}</span></a>
                <a href="#assessment" onClick={() => selectLesson(lesson.id)} className="rounded-full border border-purple-400/30 px-4 py-2 text-xs font-semibold text-purple-300">Quiz & assignment<span className="sr-only"> {lesson.label}</span></a>
                <button type="button" disabled={!loaded} onClick={() => toggleComplete(lesson.id)} aria-pressed={done} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-grey disabled:opacity-50"><CheckCircle2 size={14} />{done ? "Undo completion" : "Mark complete"}<span className="sr-only"> {lesson.label}</span></button>
              </div>
            </article>;
          })}</div>
        </section>
        <aside id="notes" ref={notesRef} tabIndex={0} aria-label="Lesson notes and practice" className="course-notes-panel min-w-0 scroll-mt-6 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow lg:sticky lg:top-6">
          <div className="rounded-3xl border border-white/10 bg-card/70">
            <div className="rounded-t-3xl border-b border-white/10 bg-gradient-to-br from-blue-950/70 to-yellow/5 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow">BEGINNER NOTES / {active.label}</p>
              <h2 className="mt-3 text-2xl font-extrabold">{active.title}</h2>
              <LessonNavigation index={activeIndex} total={lessons.length} onSelect={(index) => selectLesson(lessons[index].id)} />
              <LessonVideo videoId={active.id} title={active.title} playlistId={course.playlistId} loaded={playerId === active.id} onLoad={() => watchLesson(active.id)} onOpenYouTube={() => openYouTube(active.id)} />
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-bold text-grey"><span className="rounded-lg border border-white/10 px-3 py-2">LEARN</span><span>→</span><span className="rounded-lg border border-white/10 px-3 py-2">TRY</span><span>→</span><span className="rounded-lg border border-yellow/20 px-3 py-2 text-yellow">BUILD</span></div>
            </div>
            <div className="space-y-6 p-6">
              <div><h3 className="font-bold">The idea, simply explained</h3><p className="mt-3 text-sm leading-7 text-grey">{active.explanation}</p></div>
              <div><h3 className="font-bold">An example to explore</h3><pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#070b14] p-4 text-xs leading-6 text-white/90"><code>{active.example}</code></pre><p className="mt-2 text-xs leading-5 text-grey">Original illustrative code, pseudocode or flow—not a transcript or a command to run blindly.</p></div>
              <SourceNotes key={active.id} documents={documents.filter((document) => active.sourceIds.includes(document.id))} importedAt={importedAt} study={{
                videoId: active.id, label: active.label, definition: active.explanation, example: active.example, guide: active.studyGuide,
                question: active.assessment.question, answer: active.assessment.options[active.assessment.answer],
                assignment: active.assessment.assignment, criteria: active.assessment.criteria,
              }} />
              <div id="assessment" className="scroll-mt-6"><LessonAssessment key={active.id} day={lessons.indexOf(active) + 1} label={active.label} assessment={active.assessment} storageKey={`itkannadigaru-assessment-${course.playlistId}-${active.id}-v1`} /></div>
              <LessonNavigation index={activeIndex} total={lessons.length} onSelect={(index) => selectLesson(lessons[index].id)} />
              <a href="#course-project" className="inline-block text-sm font-bold text-yellow">Put your skills together: final project →</a>
            </div>
          </div>
        </aside>
      </div>
      <CourseProject slug={course.slug} />
    </main>
    <CourseCertificate title={course.title} count={lessons.length} complete={allComplete} />
    </>
  );
}
