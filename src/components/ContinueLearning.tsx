"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { readLessonResume } from "@/lib/course-resume";

type ResumeCourse = {
  slug: string;
  title: string;
  lessons: { id: string; title: string; label: string }[];
};
type SavedCourse = { slug: string; title: string; lesson: ResumeCourse["lessons"][number]; updatedAt: number };

export default function ContinueLearning({ courses }: { courses: ResumeCourse[] }) {
  const [saved, setSaved] = useState<SavedCourse[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    function refresh() {
      const next: SavedCourse[] = [];
      let failed = false;
      for (const course of courses) {
        try {
          const record = readLessonResume(window.localStorage, course.slug, course.lessons.map((lesson) => lesson.id));
          if (record) {
            const lesson = course.lessons.find((lesson) => lesson.id === record.videoId)!;
            next.push({ slug: course.slug, title: course.title, lesson, updatedAt: record.updatedAt });
          }
        } catch {
          failed = true;
        }
      }
      setSaved(next.sort((a, b) => b.updatedAt - a.updatedAt));
      setError(failed ? "Some saved lessons could not be read. Open a course and select a lesson to continue." : "");
    }
    const timer = window.setTimeout(refresh, 0);
    window.addEventListener("storage", refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", refresh);
    };
  }, [courses]);

  if (!saved.length && !error) return null;
  return (
    <section className="mt-8 rounded-3xl border border-yellow/20 bg-yellow/5 p-6" aria-labelledby="continue-title">
      <h3 id="continue-title" className="text-xl font-bold">Continue learning</h3>
      <p className="mt-2 text-sm text-grey">Your last selected lessons, saved in this browser on this device.</p>
      {error && <p role="alert" className="mt-3 text-sm text-orange-200">{error}</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((course) => <Link key={course.slug} href={`/learn/${course.slug}#notes`} className="min-w-0 rounded-2xl border border-white/10 bg-card p-4 hover:border-yellow">
          <p className="text-xs font-bold text-yellow">{course.title} · {course.lesson.label}</p>
          <p className="mt-2 break-words text-sm font-semibold">{course.lesson.title}</p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold">Resume lesson <ArrowRight size={15} /></span>
        </Link>)}
      </div>
    </section>
  );
}
