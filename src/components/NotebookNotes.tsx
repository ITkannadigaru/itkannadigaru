"use client";

import SourceNotes from "@/components/SourceNotes";
import notebooks from "@/data/python-notebooks.json";

export default function NotebookNotes({ source }: { source?: string }) {
  const notebook = Object.entries(notebooks.notebooks).find(([file]) => source?.endsWith(`/${file}`));
  if (!notebook) {
    return <p className="rounded-2xl border border-white/10 p-4 text-sm leading-6 text-grey">No matching .ipynb notebook is attached to this day yet. Use the original lesson notes above{source ? " and the linked GitHub project" : ""}.</p>;
  }
  const [file, data] = notebook;

  return <SourceNotes document={{ ...data, id: file, title: file, commit: notebooks.commit }} importedAt={notebooks.importedAt} />;
}
