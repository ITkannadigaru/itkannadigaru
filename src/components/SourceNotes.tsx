"use client";

import { useId, useState } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { StudyLesson } from "@/lib/python-study-guides";
import { lessonVisuals } from "@/lib/lesson-visuals";
import { StudyVisual, VisualWalkthrough } from "@/components/StudyVisual";

export type SourceDocument = {
  id: string;
  title: string;
  source: string;
  commit: string;
  cells: { type: string; content: string; output?: string }[];
};

export default function SourceNotes({ documents, importedAt, study }: { documents: SourceDocument[]; importedAt: string; study: StudyLesson }) {
  const [expanded, setExpanded] = useState(false);
  const readerId = `study-${useId().replace(/:/g, "")}`;
  const visual = lessonVisuals[study.videoId];
  const sections = [["concept", "Concept"], ["example", "Worked example"], ["revision", "Revision"], ["reference", "Original reference"]];
  return (
    <div className="rounded-2xl border border-yellow/20 bg-background/60 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-yellow">STUDENT STUDY NOTES / {study.label}</p>
      <h3 className="mt-3 text-lg font-bold">{study.guide.title}</h3>
      <p className="mt-3 text-sm leading-6 text-grey">Understand the concept, follow a worked example, then revise in your own words. These original teaching explanations complement the GitHub references below; neither is a video transcript.</p>
      <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={readerId} className="mt-4 block rounded-full bg-yellow px-5 py-2.5 text-sm font-bold text-background">{expanded ? "Close study notes" : documents.length ? "Read source notes" : "Read study notes"}</button>
      {expanded && <div id={readerId} className="study-reader mt-5 max-h-[75vh] space-y-8 overflow-auto overscroll-contain rounded-xl border border-white/10 bg-[#0b1120] p-5 sm:p-6" tabIndex={0} aria-label={`${study.label} study notes: ${study.guide.title}`}>
        <nav aria-label="Study note sections" className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {sections.map(([id, label]) => <a key={id} href={`#${readerId}-${id}`} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-yellow">{label}</a>)}
        </nav>
        <section id={`${readerId}-concept`} className="scroll-mt-4">
          <p className="text-xs font-bold tracking-wider text-yellow">01 / CORE IDEA</p>
          <h4 className="mt-3 text-xl font-bold">{study.guide.title}</h4>
          <p className="mt-4 text-sm leading-7 text-white/90">{study.definition}</p>
          <h5 className="mt-5 font-bold">Build the mental model</h5>
          <p className="mt-3 text-sm leading-7 text-grey">{study.guide.connection}</p>
          {visual && <StudyVisual visual={visual} />}
        </section>
        <section id={`${readerId}-example`} className="scroll-mt-4">
          <p className="text-xs font-bold tracking-wider text-yellow">02 / WORKED EXAMPLE</p>
          <h4 className="mt-3 text-lg font-bold">Follow the example step by step</h4>
          <p className="mt-2 text-xs leading-6 text-grey">Predict the outcome first. Examples may be code, pseudocode or a process diagram; review prerequisites before running any commands locally.</p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#060914] p-4 text-xs leading-6 text-white/90"><code>{study.example}</code></pre>
          <VisualWalkthrough steps={study.guide.walkthrough} />
        </section>
        <section className="rounded-xl border border-orange-300/20 bg-orange-300/5 p-4">
          <h4 className="font-bold text-orange-200">A common mistake to avoid</h4>
          <p className="mt-3 text-sm leading-7 text-grey">{study.guide.mistake}</p>
        </section>
        <section id={`${readerId}-revision`} className="scroll-mt-4">
          <p className="text-xs font-bold tracking-wider text-yellow">03 / QUICK REVISION</p>
          <h4 className="mt-3 text-lg font-bold">Write this in your own notes</h4>
          <p className="mt-4 border-l-2 border-yellow pl-4 text-sm font-medium leading-7 text-white/90">{study.guide.remember}</p>
          <details className="mt-5 rounded-xl border border-purple-300/20 bg-purple-300/5 p-4">
            <summary className="cursor-pointer text-sm font-bold leading-6 text-purple-200">Recall check: {study.question}</summary>
            <p className="mt-3 text-sm leading-7 text-grey"><strong className="text-white">{study.answer}.</strong> {study.guide.remember}</p>
          </details>
          <p className="mt-3 text-xs leading-5 text-grey">Try answering without looking first. This revision aid does not submit a quiz answer or change progress.</p>
        </section>
        <section>
          <p className="text-xs font-bold tracking-wider text-yellow">04 / PUT IT INTO PRACTICE</p>
          <h4 className="mt-3 text-lg font-bold">One task after reading</h4>
          <p className="mt-3 text-sm leading-7 text-white/90">{study.assignment}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-grey">{study.criteria.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="mt-4 text-xs leading-6 text-grey">Keep your code, design or observations, and explain why the result is correct. Mark the separate assignment checklist only after completing the work.</p>
        </section>
        <section id={`${readerId}-reference`} className="scroll-mt-4 border-t border-white/10 pt-5">
          <p className="text-xs font-bold tracking-wider text-yellow">05 / SOURCE REFERENCE</p>
          {documents.length ? <><p className="mt-3 text-xs leading-6 text-grey">Original modules are preserved below and may cover several lessons. They are not day-specific transcripts. Check dependency versions and configuration; code is displayed, never executed. Saved outputs can differ on your machine. HTML and rich outputs are omitted.</p>
          {documents.map((document) => <details key={document.id} className="mt-4 rounded-xl border border-white/10 p-4">
            <summary className="cursor-pointer break-words text-sm font-semibold text-yellow">Original GitHub reference: {document.title}</summary>
            <a href={document.source} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-semibold text-yellow underline underline-offset-4">View pinned source on GitHub ↗</a>
            <p className="mt-2 text-xs text-grey">Imported {importedAt.slice(0, 10)} · Source commit {document.commit.slice(0, 7)}</p>
            <div className="mt-5 space-y-5">
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
            </div>
          </details>)}</> : <p className="mt-3 text-sm leading-7 text-grey">No matching GitHub module is attached to this lesson. These study notes and exercises are original companion material; they do not claim the exact demonstration or problem shown in the video.</p>}
        </section>
      </div>}
    </div>
  );
}
