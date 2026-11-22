"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Compass } from "lucide-react";

const stages = [
  { name: "Python foundations", detail: "Build confidence with variables, data structures, functions and practical Python.", milestone: "Write a small Python program and understand how data moves through it.", color: "text-yellow" },
  { name: "Understand AI & LLMs", detail: "Learn the ideas behind AI, language models, tokens and prompts before choosing your tools.", milestone: "Explain the difference between an AI application and the model it uses.", color: "text-blue-400" },
  { name: "Build with AI", detail: "Explore how prompts, retrieval and external data fit together in an AI application.", milestone: "Plan an application that answers questions using your own documents.", color: "text-purple-400" },
  { name: "Ship real projects", detail: "Practise testing, deployment and responsible operation by building something useful.", milestone: "Take a small project from an idea to a working demonstration.", color: "text-green-400" },
];

export default function AIRoadmap() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];

  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <p className="text-xs font-bold tracking-[0.2em] text-yellow">YOUR NORTH STAR</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-extrabold sm:text-4xl">The AI engineering roadmap</h2><p className="mt-3 max-w-2xl leading-7 text-grey">Explore the journey before you begin. Select a milestone to see where it can take you.</p></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs text-grey">INTERACTIVE LEARNING GUIDE</span></div>
      <div className="mt-10 rounded-3xl border border-white/10 bg-card/60 p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4"><span className="text-sm font-bold text-grey">EXPLORE THE PATH</span><span className="flex items-center gap-2 text-sm text-yellow"><Bot size={19} /> Step {selected + 1} of {stages.length}</span></div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-yellow to-orange-400 transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${((selected + 1) / stages.length) * 100}%` }} /></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`rounded-2xl border p-5 text-left transition ${selected === index ? "border-yellow/50 bg-yellow/5" : "border-white/10 bg-background/40 hover:border-white/30"}`}><span className={`font-mono text-sm font-bold ${item.color}`}>{String(index + 1).padStart(2, "0")} / 04</span><span className="mt-3 block font-bold">{item.name}</span></button>)}
        </div>
        <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-background/60 p-6 md:flex-row md:items-center"><div><p className="flex items-center gap-2 text-xs font-bold tracking-widest text-yellow"><Compass size={15} /> MILESTONE {selected + 1}</p><h3 className="mt-3 text-xl font-bold">{stage.name}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-grey">{stage.detail}</p><p className="mt-3 text-sm text-white/80"><span className="font-bold text-yellow">Goal:</span> {stage.milestone}</p></div>{selected === 0 && <Link href="/learn/python-for-ai" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-yellow px-5 py-3 text-sm font-bold text-background hover:brightness-110">Start Python <ArrowRight size={16} /></Link>}</div>
        <p className="mt-4 text-xs leading-5 text-grey">This roadmap is a suggested learning journey. Later milestones describe goals, not a guarantee that every topic has a course available today.</p>
      </div>
    </section>
  );
}
