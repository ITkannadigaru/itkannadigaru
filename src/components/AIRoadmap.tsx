"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Compass } from "lucide-react";
import { learningPaths } from "@/lib/learning-paths";

export default function AIRoadmap() {
  const [pathIndex, setPathIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const path = learningPaths[pathIndex];
  const stages = path.stages;
  const stage = stages[selected];

  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <p className="text-xs font-bold tracking-[0.2em] text-yellow">YOUR NORTH STAR</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-extrabold sm:text-4xl">Choose your learning path</h2><p className="mt-3 max-w-2xl leading-7 text-grey">Choose your goal, check the prerequisites and follow linked courses toward a practical project.</p></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs text-grey">INTERACTIVE LEARNING GUIDE</span></div>
      <div aria-label="Learning path choices" className="mt-6 flex flex-wrap gap-3">{learningPaths.map((item, index) => <button key={item.id} type="button" aria-pressed={pathIndex === index} onClick={() => { setPathIndex(index); setSelected(0); }} className={`rounded-full border px-5 py-3 text-sm font-bold ${pathIndex === index ? "border-yellow bg-yellow text-background" : "border-white/20 hover:border-yellow"}`}>{item.title}</button>)}</div>
      <div className="mt-10 rounded-3xl border border-white/10 bg-card/60 p-5 sm:p-8">
        <h3 className="text-xl font-bold">{path.title}</h3>
        <p className="mb-6 mt-3 text-sm leading-7 text-grey"><strong className="text-white">Before starting:</strong> {path.prerequisites}</p>
        <div className="mb-6 flex items-center justify-between gap-4"><span className="text-sm font-bold text-grey">EXPLORE THE PATH</span><span className="flex items-center gap-2 text-sm text-yellow"><Bot size={19} /> Step {selected + 1} of {stages.length}</span></div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-yellow to-orange-400 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${((selected + 1) / stages.length) * 100}%` }} /></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`rounded-2xl border p-5 text-left transition ${selected === index ? "border-yellow/50 bg-yellow/5" : "border-white/10 bg-background/40 hover:border-white/30"}`}><span className="font-mono text-sm font-bold text-yellow">{String(index + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span><span className="mt-3 block font-bold">{item.name}</span></button>)}
        </div>
        <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-background/60 p-6 md:flex-row md:items-center"><div><p className="flex items-center gap-2 text-xs font-bold tracking-widest text-yellow"><Compass size={15} /> MILESTONE {selected + 1}</p><h3 className="mt-3 text-xl font-bold">{stage.name}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-grey">{stage.detail}</p><p className="mt-3 text-sm text-white/80"><span className="font-bold text-yellow">Goal:</span> {stage.milestone}</p></div><Link href={`/learn/${stage.slug}${stage.project ? "#course-project" : ""}`} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-yellow px-5 py-3 text-sm font-bold text-background hover:brightness-110">{stage.project ? "Open final project" : "Explore course"} <ArrowRight size={16} /></Link></div>
        <p className="mt-4 text-xs leading-5 text-grey">Selecting milestones explores a suggested path; it does not record completion. All links lead to available courses or original companion projects. Review each course&apos;s prerequisites before starting.</p>
      </div>
    </section>
  );
}
