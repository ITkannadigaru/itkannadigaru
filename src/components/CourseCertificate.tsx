"use client";

import { useId, useState } from "react";
import { Award } from "lucide-react";

function ITKSeal() {
  const id = `itk-seal-${useId().replace(/:/g, "")}`;
  return (
    <svg className="certificate-seal" viewBox="0 0 128 160" role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg">
      <title id={`${id}-title`}>ITKannadigaru learning badge</title>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9e6a0" />
          <stop offset="0.5" stopColor="#d5a900" />
          <stop offset="1" stopColor="#9c7200" />
        </linearGradient>
      </defs>
      <path d="M32 94 L22 150 L43 137 L58 153 L65 105 Z" fill="#b18a00" />
      <path d="M65 105 L70 153 L85 137 L106 150 L96 94 Z" fill="#d5a900" />
      <circle cx="64" cy="62" r="57" fill={`url(#${id}-gold)`} stroke="#9c7200" strokeWidth="2" />
      <circle cx="64" cy="62" r="51" fill="none" stroke="#fff8de" strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx="64" cy="62" r="46" fill="#fffdf3" stroke="#a47900" strokeWidth="1" />
      <g fill="#9c7200" textAnchor="middle" fontFamily="Arial, sans-serif">
        <circle cx="54" cy="28" r="1.5" /><circle cx="64" cy="25" r="2" /><circle cx="74" cy="28" r="1.5" />
        <text x="64" y="43" fontSize="8" fontWeight="700" letterSpacing="0.6">ITKANNADIGARU</text>
        <text x="64" y="72" fontSize="30" fontWeight="800" letterSpacing="1">ITK</text>
        <text x="64" y="88" fontSize="7" fontWeight="700" letterSpacing="0.5">LEARN · BUILD</text>
      </g>
    </svg>
  );
}

export default function CourseCertificate({ title, count, complete }: { title: string; count: number; complete: boolean }) {
  const [name, setName] = useState("");
  return (
    <>
      <section id="certificate" className="course-page mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-card to-[#17162a] p-7 sm:p-10">
          <div className="flex flex-wrap items-start gap-5">
            <div className="rounded-2xl bg-yellow/10 p-4 text-yellow"><Award size={28} /></div>
            <div><p className="text-xs font-bold tracking-widest text-yellow">CELEBRATE YOUR JOURNEY</p><h2 className="mt-2 text-2xl font-bold">Your learning certificate</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-grey">Mark all {count} lessons complete to create a personal, self-reported completion certificate. Use your browser&apos;s print dialog to save it as a PDF. Opening videos or completing quizzes alone does not unlock it.</p></div>
          </div>
          {complete ? <div className="mt-6 flex flex-wrap items-end gap-3"><label className="text-sm font-semibold">Name for your certificate<input className="mt-2 block w-full min-w-64 rounded-xl border border-white/20 bg-background px-4 py-3 text-white outline-none focus:border-yellow" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} placeholder="Enter your name" /></label><button type="button" disabled={!name.trim()} onClick={() => window.print()} className="rounded-full bg-yellow px-6 py-3 font-bold text-background disabled:opacity-50">Print / save as PDF</button></div> : <p className="mt-5 text-sm text-grey">Certificate locked until all lessons are marked complete.</p>}
        </div>
      </section>
      {complete && <section className="certificate-print" aria-label="Certificate of completion"><div className="certificate-border"><p className="certificate-brand">&lt;/&gt; ITKannadigaru</p><p className="certificate-eyebrow">LEARN · PRACTISE · BUILD</p><h1>Certificate of Completion</h1><p>Proudly presented to</p><h2>{name.trim()}</h2><p>in recognition of completing the</p><h3>{title}</h3><p className="certificate-footer">ಕನ್ನಡಿಗನಿಂದ ಕನ್ನಡಿಗರಿಗಾಗಿ</p><ITKSeal /></div></section>}
    </>
  );
}
