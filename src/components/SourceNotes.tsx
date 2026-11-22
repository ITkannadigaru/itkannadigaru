"use client";

import { useState } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";

export type SourceDocument = {
  id: string;
  title: string;
  source: string;
  commit: string;
  cells: { type: string; content: string; output?: string }[];
};

export default function SourceNotes({ document, importedAt }: { document: SourceDocument; importedAt: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-5">
      <p className="text-xs font-bold tracking-widest text-yellow">RELATED GITHUB SOURCE NOTES</p>
      <p className="mt-2 break-all text-sm font-semibold">{document.title}</p>
      <p className="mt-3 text-xs leading-5 text-grey">Full related module, shared across relevant lessons—not a video transcript. Examples may need updated dependencies or configuration. Code is displayed, never executed here. Outputs are saved results; HTML and rich outputs are omitted.</p>
      <a href={document.source} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-yellow underline underline-offset-4">View pinned source on GitHub ↗</a>
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} className="mt-4 block rounded-full border border-yellow/30 px-4 py-2 text-sm font-semibold text-yellow">{expanded ? "Close source notes" : "Read source notes"}</button>
      {expanded && <div className="mt-5 max-h-[65vh] space-y-5 overflow-auto overscroll-contain rounded-xl border border-white/10 p-4" tabIndex={0} aria-label={`Source notes ${document.title}`}>
        {document.cells.map((cell, index) => cell.type === "markdown" ?
          <div key={index} className="notebook-markdown">
            <Markdown skipHtml remarkPlugins={[remarkGfm]} urlTransform={(url, _key, node) => {
              const safe = defaultUrlTransform(url);
              if (!safe) return "";
              const base = new URL(document.source);
              if (node.tagName === "img" && base.hostname === "github.com") {
                base.hostname = "raw.githubusercontent.com";
                base.pathname = base.pathname.replace("/blob/", "/");
              }
              return new URL(safe, base).href;
            }} components={{
              h1: ({ children }) => <h4>{children}</h4>,
              h2: ({ children }) => <h4>{children}</h4>,
              h3: ({ children }) => <h4>{children}</h4>,
              a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
            }}>{cell.content}</Markdown>
          </div> :
          <div key={index}>
            <span className="text-xs font-bold text-grey">CODE EXAMPLE {index + 1}</span>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-[#060914] p-4 text-xs leading-6 text-white/90"><code>{cell.content}</code></pre>
            {cell.output && <div className="mt-2 rounded-xl border border-green-400/10 bg-green-400/5 p-3"><p className="text-[10px] font-bold tracking-wider text-green-300">SAVED OUTPUT</p><pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-5 text-grey">{cell.output}</pre></div>}
          </div>)}
      </div>}
      <p className="mt-3 text-xs text-grey">Imported {importedAt.slice(0, 10)} · Source commit {document.commit.slice(0, 7)}</p>
    </div>
  );
}
