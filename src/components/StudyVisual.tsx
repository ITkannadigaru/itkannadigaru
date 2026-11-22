"use client";

import { useId, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { LessonVisual } from "@/lib/lesson-visuals";

export function StudyVisual({ visual }: { visual: LessonVisual }) {
  const titleId = useId();
  return (
    <figure aria-labelledby={titleId} className="mt-5 rounded-2xl border border-blue-300/20 bg-blue-300/5 p-4">
      <figcaption id={titleId} className="font-bold text-blue-200">{visual.title}</figcaption>
      <ol className={`mt-4 ${visual.kind === "comparison" ? "grid gap-3 sm:grid-cols-2" : "space-y-2"}`}>
        {visual.nodes.map((node, index) => <li key={node} className="min-w-0">
          <div className="flex items-start gap-3 rounded-xl border border-white/15 bg-background/70 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow/10 text-xs font-bold text-yellow">{index + 1}</span>
            <span className="break-words text-sm leading-6">{node}</span>
          </div>
          {visual.kind === "flow" && index < visual.nodes.length - 1 && <ArrowDown aria-hidden="true" size={16} className="mx-auto mt-2 text-yellow" />}
        </li>)}
      </ol>
      <div className="mt-4 rounded-xl border border-green-300/20 bg-green-300/5 p-4">
        <h5 className="text-sm font-bold text-green-200">Expected output / observation</h5>
        <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-white/90">{visual.expected}</pre>
        <p className="mt-2 text-xs leading-5 text-grey">Worked expectation, not output executed or verified by this page.</p>
      </div>
      <details className="mt-4 rounded-xl border border-orange-300/20 p-4">
        <summary className="cursor-pointer text-sm font-bold text-orange-200">Debug this example</summary>
        <p className="mt-3 text-sm leading-6 text-grey"><strong className="text-white">Symptom:</strong> {visual.fault}</p>
        <p className="mt-3 text-sm leading-6 text-grey"><strong className="text-yellow">Check and fix:</strong> {visual.fix}</p>
      </details>
    </figure>
  );
}

export function VisualWalkthrough({ steps }: { steps: string[] }) {
  const [selected, setSelected] = useState(0);
  const detailId = useId();
  return (
    <div className="mt-5 rounded-xl border border-yellow/20 bg-yellow/5 p-4">
      <p className="text-xs font-bold tracking-wider text-yellow">TRACE THE EXAMPLE</p>
      <p className="mt-2 text-xs leading-5 text-grey">Select each step to follow the explanation. This does not change lesson progress.</p>
      <ol className="mt-4 flex flex-wrap items-center gap-2">
        {steps.map((_step, index) => <li key={index} className="flex items-center gap-2">
          <button type="button" aria-pressed={selected === index} aria-controls={detailId} onClick={() => setSelected(index)} className={`rounded-xl border px-3 py-2 text-xs font-bold ${selected === index ? "border-yellow bg-yellow text-background" : "border-white/20 hover:border-yellow"}`}>Step {index + 1}</button>
          {index < steps.length - 1 && <ArrowRight aria-hidden="true" size={14} className="text-yellow" />}
        </li>)}
      </ol>
      <div id={detailId} aria-live="polite" className="mt-4 rounded-xl border border-white/10 bg-background/70 p-4">
        <h5 className="text-sm font-bold">Step {selected + 1} of {steps.length}</h5>
        <p className="mt-3 text-sm leading-7 text-grey">{steps[selected]}</p>
      </div>
    </div>
  );
}
