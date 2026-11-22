"use client";

import { useEffect, useState } from "react";
import { assessments, type Assessment } from "@/lib/python-assessments";

type Attempt = { answer: number | null; submitted: boolean; checked: number[] };

type Props = { day: number; assessment?: Assessment; storageKey?: string; label?: string };

export default function LessonAssessment({ day, assessment = assessments[day], storageKey, label = `Day ${day}` }: Props) {
  const [attempt, setAttempt] = useState<Attempt>({ answer: null, submitted: false, checked: [] });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const key = storageKey ?? `itkannadigaru-python-assessment-day-${day}-v1`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          const value: unknown = JSON.parse(saved);
          if (typeof value !== "object" || value === null ||
              !("answer" in value) || !(value.answer === null || (typeof value.answer === "number" && Number.isInteger(value.answer) && value.answer >= 0 && value.answer < assessment.options.length)) ||
              !("submitted" in value) || typeof value.submitted !== "boolean" || (value.submitted && value.answer === null) ||
              !("checked" in value) || !Array.isArray(value.checked) ||
              !value.checked.every((item: unknown) => typeof item === "number" && Number.isInteger(item) && item >= 0 && item < assessment.criteria.length)) {
            throw new Error("Invalid saved assessment");
          }
          setAttempt({ answer: value.answer, submitted: value.submitted, checked: [...new Set<number>(value.checked)] });
        }
      } catch {
        setError("This lesson's saved practice could not be read. You can try again below.");
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [key, assessment]);

  function save(next: Attempt) {
    setAttempt(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setError("");
    } catch {
      setError("Practice results could not be saved in this browser and may be lost.");
    }
  }

  const correct = attempt.answer === assessment.answer;
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-purple-400/20 bg-purple-400/5 p-5" aria-labelledby={`quiz-title-${day}`}>
        <p className="text-xs font-bold tracking-widest text-purple-300">CHECK YOUR UNDERSTANDING</p>
        <h3 id={`quiz-title-${day}`} className="mt-3 text-lg font-bold">{label} quiz</h3>
        <fieldset disabled={!ready || attempt.submitted} className="mt-4">
          <legend className="mb-3 text-sm font-medium leading-6">{assessment.question}</legend>
          <div className="space-y-2">{assessment.options.map((option, index) => <label key={option} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6 ${attempt.answer === index ? "border-purple-300/50 bg-purple-300/10" : "border-white/10"}`}><input type="radio" name={`quiz-day-${day}`} value={index} checked={attempt.answer === index} onChange={() => save({ ...attempt, answer: index })} className="mt-1 accent-purple-400" />{option}</label>)}</div>
        </fieldset>
        {!attempt.submitted ? <button type="button" disabled={!ready || attempt.answer === null} onClick={() => save({ ...attempt, submitted: true })} className="mt-4 rounded-full bg-purple-400 px-5 py-2.5 text-sm font-bold text-background disabled:opacity-40">Check answer</button> :
          <div className="mt-4"><p role="status" className={`text-sm font-bold ${correct ? "text-green-300" : "text-orange-300"}`}>{correct ? "Correct — nice work!" : "Not quite — review the explanation."}</p><p className="mt-2 text-sm leading-6 text-grey">{assessment.explanation}</p><button type="button" onClick={() => save({ ...attempt, answer: null, submitted: false })} className="mt-3 text-sm font-semibold text-purple-300 underline underline-offset-4">Try again</button></div>}
      </section>
      <section className="rounded-2xl border border-yellow/20 bg-yellow/5 p-5">
        <p className="text-xs font-bold tracking-widest text-yellow">BUILD YOUR SKILLS</p>
        <h3 className="mt-3 text-lg font-bold">{label} assignment</h3>
        <p className="mt-3 text-sm leading-6 text-white/90">{assessment.assignment}</p>
        <p className="mt-4 text-xs font-bold tracking-wider text-grey">YOUR ACCEPTANCE CHECKLIST</p>
        <div className="mt-3 space-y-3">{assessment.criteria.map((criterion, index) => <label key={criterion} className="flex items-start gap-3 text-sm leading-6 text-grey"><input type="checkbox" disabled={!ready} checked={attempt.checked.includes(index)} onChange={() => save({ ...attempt, checked: attempt.checked.includes(index) ? attempt.checked.filter((item) => item !== index) : [...attempt.checked, index] })} className="mt-1 accent-yellow" />{criterion}</label>)}</div>
        <p className="mt-4 text-xs leading-5 text-grey">{attempt.checked.length} of {assessment.criteria.length} checks marked by you. Complete the task locally, then keep your code or design, sample results and a short explanation of what you learned. No submission is uploaded, executed or graded here.</p>
      </section>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <p className="text-xs leading-5 text-grey">Quizzes and assignments are original companion exercises, not a professional certification exam. Results stay on this device and do not change your certificate eligibility.</p>
    </div>
  );
}
