export type LessonResume = { videoId: string; updatedAt: number };

export function resumeKey(slug: string) {
  return `itkannadigaru-resume-${slug}-v1`;
}

export function readLessonResume(storage: Pick<Storage, "getItem">, slug: string, videoIds: readonly string[]): LessonResume | null {
  const saved = storage.getItem(resumeKey(slug));
  if (!saved) return null;
  const value: unknown = JSON.parse(saved);
  if (
    !value || typeof value !== "object" ||
    !("videoId" in value) || typeof value.videoId !== "string" || !videoIds.includes(value.videoId) ||
    !("updatedAt" in value) || typeof value.updatedAt !== "number" || !Number.isFinite(value.updatedAt) || value.updatedAt <= 0
  ) {
    throw new Error("Invalid saved lesson");
  }
  return { videoId: value.videoId, updatedAt: value.updatedAt };
}
