import { notFound } from "next/navigation";
import VideoCourse from "@/components/VideoCourse";
import { catalog } from "@/lib/catalog";
import { getCourseLessons, roadmaps } from "@/lib/course-lessons";
import { getCourseMaterials } from "@/lib/course-materials";

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ course: slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const selected = catalog.find((item) => item.slug === course);
  if (!selected) notFound();
  const lessons = getCourseLessons(selected);
  return <VideoCourse key={selected.slug} course={selected} lessons={lessons} roadmap={roadmaps[selected.slug]} {...getCourseMaterials(lessons)} />;
}
