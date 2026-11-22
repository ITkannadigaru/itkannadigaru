"use client";

import SourceNotes from "@/components/SourceNotes";
import notebooks from "@/data/python-notebooks.json";
import type { Lesson } from "@/lib/python-lessons";
import { getPythonStudyGuide } from "@/lib/python-study-guides";
import { assessments } from "@/lib/python-assessments";

export default function NotebookNotes({ lesson }: { lesson: Lesson }) {
  const notebook = Object.entries(notebooks.notebooks).find(([file]) => lesson.source?.endsWith(`/${file}`));
  const documents = notebook ? [{ ...notebook[1], id: notebook[0], title: notebook[0], commit: notebooks.commit }] : [];
  const assessment = assessments[lesson.day];
  return <SourceNotes documents={documents} importedAt={notebooks.importedAt} study={{
    videoId: lesson.video, label: `Day ${lesson.day}`, definition: lesson.explanation, example: lesson.code,
    guide: getPythonStudyGuide(lesson.video), question: assessment.question,
    answer: assessment.options[assessment.answer], assignment: assessment.assignment, criteria: assessment.criteria,
  }} />;
}
