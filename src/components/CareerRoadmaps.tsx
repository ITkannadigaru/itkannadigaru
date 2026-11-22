"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Bot, CloudCog, Compass, Sparkles } from "lucide-react";
import { careerRoadmaps, type CareerRoadmap } from "@/lib/career-roadmaps";

export default function CareerRoadmaps() {
  const [selected, setSelected] = useState<CareerRoadmap["id"] | null>(null);
  const reducedMotion = useReducedMotion();
  const roadmap = careerRoadmaps.find((item) => item.id === selected);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2" aria-label="Choose a career roadmap">
        {careerRoadmaps.map((item) => {
          const Icon = item.id === "ai" ? Bot : CloudCog;
          const active = selected === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-expanded={active}
              aria-controls="career-roadmap"
              onClick={() => setSelected(active ? null : item.id)}
              whileHover={reducedMotion ? undefined : { y: -4 }}
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow sm:p-8 ${active ? "border-yellow/70 bg-yellow/10" : "border-white/10 bg-card/70 hover:border-yellow/50"}`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-yellow/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow/25 bg-yellow/10 text-yellow"><Icon size={24} /></span>
                <span className="font-mono text-xs tracking-widest text-grey">{item.phases.length} PHASES</span>
              </span>
              <span className="relative mt-6 block text-xl font-extrabold sm:text-2xl">{item.invitation}</span>
              <span className="relative mt-3 block max-w-lg text-sm leading-6 text-grey">{item.description}</span>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-yellow">{active ? "Close roadmap" : "Explore the roadmap"} <ArrowRight size={16} className={`transition-transform motion-reduce:transition-none ${active ? "rotate-90" : "group-hover:translate-x-1"}`} /></span>
            </motion.button>
          );
        })}
      </div>

      <div id="career-roadmap">
        <AnimatePresence mode="wait" initial={false}>
          {roadmap && (
            <motion.div
              key={roadmap.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="relative mt-6 overflow-hidden rounded-3xl border border-yellow/20 bg-[#090e1b] p-5 sm:p-8"
            >
              <div aria-hidden="true" className="bg-circuit-grid pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-yellow"><Compass size={15} /> YOUR CAREER ROADMAP</p>
                    <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">{roadmap.title} <span className="text-yellow">path</span></h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-grey">{roadmap.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-yellow/20 bg-yellow/5 px-4 py-2 text-xs font-bold text-yellow"><Sparkles size={14} /> LEARN AT YOUR PACE</span>
                </div>

                <div className="mt-8 space-y-3">
                  {roadmap.phases.map((phase, index) => (
                    <div key={phase.title}>
                      {index > 0 && <div aria-hidden="true" className="flex h-9 items-center pl-5 text-yellow/60"><ArrowDown size={18} /></div>}
                      <section className="rounded-2xl border border-white/10 bg-[#111827]/90 p-5 sm:p-6" aria-labelledby={`${roadmap.id}-phase-${index}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-xs font-bold tracking-widest text-yellow">PHASE {String(index + 1).padStart(2, "0")}</p>
                            <h4 id={`${roadmap.id}-phase-${index}`} className="mt-2 text-lg font-bold">{phase.title}</h4>
                            <p className="mt-2 text-sm leading-6 text-grey">{phase.outcome}</p>
                          </div>
                          {phase.course && <Link href={`/learn/${phase.course.slug}`} className="inline-flex items-center gap-2 rounded-full border border-yellow/30 px-4 py-2 text-xs font-bold text-yellow transition-colors hover:bg-yellow/10">{phase.course.label} <ArrowRight size={14} /></Link>}
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {phase.topics.map((topic) => (
                            <div key={topic.name} className="rounded-xl border border-white/10 bg-background/70 p-4 transition-colors hover:border-yellow/40">
                              <p className="text-sm font-bold text-white">{topic.name}</p>
                              <p className="mt-2 text-xs leading-5 text-grey"><span className="font-semibold text-yellow">Why:</span> {topic.why}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-6 text-grey">This is a suggested learning sequence, not a job guarantee. Some foundations and tools require resources beyond the linked courses. Use test environments, approved data and cost controls for cloud and AI practice.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
