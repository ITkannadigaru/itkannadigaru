import snapshot from "@/data/course-notes.json";
import type { CourseLesson } from "@/lib/course-lessons";

export function getCourseMaterials(lessons: CourseLesson[]) {
  const sourceIds = new Set(lessons.flatMap((lesson) => lesson.sourceIds));
  const documents = snapshot.documents.filter((document) => sourceIds.has(document.id));
  for (const id of sourceIds) {
    if (!documents.some((document) => document.id === id)) throw new Error(`Missing imported source notes: ${id}`);
  }
  return { documents, importedAt: snapshot.importedAt };
}
