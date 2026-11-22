"use client";

export default function LessonSearch({ query, onChange, count, total }: {
  query: string;
  onChange: (value: string) => void;
  count: number;
  total: number;
}) {
  return (
    <div className="mt-6">
      <label htmlFor="lesson-search" className="text-sm font-semibold">Find a lesson</label>
      <div className="mt-2 flex gap-2">
        <input id="lesson-search" type="search" value={query} onChange={(event) => onChange(event.target.value)} placeholder="Search by day or topic…" className="min-w-0 flex-1 rounded-xl border border-white/20 bg-background px-4 py-3 text-sm focus:border-yellow focus:outline-none" />
        {query && <button type="button" onClick={() => onChange("")} className="rounded-xl border border-white/20 px-3 text-sm hover:border-yellow">Clear</button>}
      </div>
      <p role="status" className="mt-2 text-xs text-grey">{count} of {total} lessons{count === 0 ? " — no matches. Try another topic or clear your search." : ""}</p>
    </div>
  );
}
