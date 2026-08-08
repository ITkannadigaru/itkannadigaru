"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import { Clock, ExternalLink, Trophy, Layers, Rocket, CheckCircle2 } from "lucide-react";

type Phase = {
  id: number;
  title: string;
  kannada: string;
  duration: string;
  difficulty: number;
  status: "live" | "coming";
  capstone?: boolean;
  playlistUrl?: string;
  topics: string[];
  accent: string;
};

const PHASES: Phase[] = [
  {
    id: 1,
    title: "Python Foundations",
    kannada: "ಪೈಥಾನ್ ಅಡಿಪಾಯ",
    duration: "Weeks 1–3",
    difficulty: 2,
    status: "live",
    playlistUrl: "https://www.youtube.com/watch?v=4FLwPm0oeFs&list=PLb7POK22N8U0",
    topics: ["Core Python & OOP", "Error & File Handling", "HTTP APIs & FastAPI", "Async Programming"],
    accent: "#ffd100",
  },
  {
    id: 2,
    title: "Mental Model of LLMs",
    kannada: "LLM ಮಾನಸಿಕ ಮಾದರಿ",
    duration: "Week 4",
    difficulty: 1,
    status: "coming",
    topics: ["How LLMs Think & Reason", "Tokens & Context Window", "Hallucination & Temperature", "GPT vs Claude vs Gemini"],
    accent: "#2563eb",
  },
  {
    id: 3,
    title: "Prompt Engineering & API Access",
    kannada: "ಪ್ರಾಂಪ್ಟ್ ಇಂಜಿನಿಯರಿಂಗ್",
    duration: "Weeks 5–7",
    difficulty: 3,
    status: "coming",
    topics: ["Core Prompt Techniques", "Applied Prompt Patterns", "Advanced Reasoning Prompts", "Token Cost Efficiency"],
    accent: "#7c3aed",
  },
  {
    id: 4,
    title: "RAG + Capstone Project 1",
    kannada: "RAG ಮತ್ತು ಮೊದಲ ಪ್ರಾಜೆಕ್ಟ್",
    duration: "Weeks 8–12",
    difficulty: 4,
    status: "coming",
    capstone: true,
    topics: ["Embeddings & Vector Databases", "Document Chunking Strategies", "Hybrid & Graph RAG", "Evaluation: Accuracy & Groundedness"],
    accent: "#ff9900",
  },
  {
    id: 5,
    title: "Tools, MCP & Single Agents",
    kannada: "ಟೂಲ್ಸ್, MCP ಮತ್ತು ಏಜೆಂಟ್ಸ್",
    duration: "Weeks 13–16",
    difficulty: 4,
    status: "coming",
    topics: ["Function Calling & Tool Use", "MCP (Model Context Protocol)", "LangChain Framework", "Human-in-the-Loop Design"],
    accent: "#22c55e",
  },
  {
    id: 6,
    title: "Memory & Context Engineering",
    kannada: "ಮೆಮೊರಿ ಮತ್ತು ಸಂದರ್ಭ",
    duration: "Weeks 17–19",
    difficulty: 3,
    status: "coming",
    topics: ["Short-term & Long-term Memory", "Semantic Caching", "Episodic Memory", "Context Compression"],
    accent: "#2563eb",
  },
  {
    id: 7,
    title: "Multi-Agent Orchestration + Capstone 2",
    kannada: "ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಆರ್ಕೆಸ್ಟ್ರೇಶನ್",
    duration: "Weeks 20–22",
    difficulty: 5,
    status: "coming",
    capstone: true,
    topics: ["LangGraph", "Agent-to-Agent Communication", "State Management", "Debugging Multi-Agent Systems"],
    accent: "#7c3aed",
  },
  {
    id: 8,
    title: "Guardrails & LLMOps",
    kannada: "ಗಾರ್ಡ್‌ರೇಲ್ಸ್ ಮತ್ತು LLMOps",
    duration: "Weeks 23–24",
    difficulty: 4,
    status: "coming",
    topics: ["Input & Output Guardrails", "Prompt Injection Prevention", "AWS Bedrock Guardrails", "Observability & Evaluation"],
    accent: "#c8102e",
  },
  {
    id: 9,
    title: "Cloud Deployment + Capstone 3",
    kannada: "ಕ್ಲೌಡ್ ಡಿಪ್ಲಾಯ್‌ಮೆಂಟ್",
    duration: "Weeks 25–26",
    difficulty: 4,
    status: "coming",
    capstone: true,
    topics: ["AWS S3, Lambda, ECS & Fargate", "VPC, Subnets, Security Groups", "Cost Calculation & Capacity", "Latency Measurement in Production"],
    accent: "#ff9900",
  },
];

const SUMMARY = [
  { label: "Phases", value: "9" },
  { label: "Weeks", value: "26" },
  { label: "Capstone Projects", value: "3" },
  { label: "Cost", value: "Free" },
  { label: "Language", value: "Kannada" },
];

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" title={`Difficulty ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full transition-colors"
          style={{ background: i < level ? "#ffd100" : "rgba(255,255,255,0.15)" }}
        />
      ))}
    </div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as Easing },
  }),
};

export default function Roadmap() {
  return (
    <section id="roadmaps" className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
      <div className="text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-widest text-yellow">
          2026 Roadmap
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          AI Engineer ಆಗೋ ದಾರಿ
        </h2>
        <p className="mt-4 text-grey">
          From Python basics to deploying production AI agents — step by step, 100% free, in Kannada.
        </p>
      </div>

      {/* Summary bar */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {SUMMARY.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-2 text-sm"
          >
            <span className="font-bold text-yellow">{s.value}</span>
            <span className="text-grey">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Phase grid */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {PHASES.map((phase, i) => (
          <motion.div
            key={phase.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:border-white/25"
            style={{ borderLeftColor: phase.accent, borderLeftWidth: 3 }}
          >
            {/* Phase number + badges row */}
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-background"
                style={{ background: phase.accent }}
              >
                {phase.id}
              </div>

              <div className="flex flex-wrap gap-2">
                {phase.status === "live" ? (
                  <span className="flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-0.5 text-xs font-semibold text-green-400">
                    <CheckCircle2 size={11} />
                    LIVE
                  </span>
                ) : (
                  <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-grey">
                    Coming Soon
                  </span>
                )}
                {phase.capstone && (
                  <span className="flex items-center gap-1 rounded-full bg-yellow/10 px-3 py-0.5 text-xs font-semibold text-yellow">
                    <Trophy size={11} />
                    Capstone
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="mt-4">
              <h3 className="text-base font-bold text-white leading-snug">{phase.title}</h3>
              <p className="mt-0.5 font-kannada text-sm text-grey">{phase.kannada}</p>
            </div>

            {/* Duration + Difficulty */}
            <div className="mt-3 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-grey">
                <Clock size={12} />
                {phase.duration}
              </span>
              <DifficultyDots level={phase.difficulty} />
            </div>

            {/* Topics */}
            <ul className="mt-4 flex-1 space-y-1.5">
              {phase.topics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-grey">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  {t}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6">
              {phase.playlistUrl ? (
                <a
                  href={phase.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-background transition hover:brightness-110"
                >
                  <ExternalLink size={14} />
                  Watch Phase {phase.id} →
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-grey">
                  Uploading soon…
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-yellow/20 bg-yellow/5 p-10 text-center"
      >
        <Rocket size={36} className="text-yellow" />
        <h3 className="text-2xl font-extrabold text-white">
          ನಿಮ್ಮ AI Journey ಇಲ್ಲಿ ಶುರು ಆಗಲಿ
        </h3>
        <p className="max-w-lg text-grey">
          All 9 phases will be published on YouTube — free, in Kannada. Subscribe so you don&apos;t miss a single video.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://www.youtube.com/@Manojdevops-z7s"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-semibold text-background transition hover:brightness-110"
          >
            <Layers size={16} />
            Subscribe on YouTube
          </a>
          <a
            href="https://www.youtube.com/watch?v=4FLwPm0oeFs&list=PLb7POK22N8U0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-yellow/40 px-6 py-3 text-sm font-semibold text-yellow transition hover:bg-yellow/10"
          >
            Start Phase 1 — Python →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
