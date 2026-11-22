export function profileName(metadata: Record<string, unknown> | null | undefined): string {
  for (const field of ["display_name", "full_name", "name"]) {
    const value = metadata?.[field];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "Learner";
}
