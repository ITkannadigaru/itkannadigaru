"use client";

import { useState } from "react";
import { Award } from "lucide-react";

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
      {complete && <section className="certificate-print" aria-label="Certificate of completion"><div className="certificate-border"><p className="certificate-brand">&lt;/&gt; ITKannadigaru</p><p className="certificate-eyebrow">A PERSONAL LEARNING MILESTONE</p><h1>Certificate of Completion</h1><p>This celebrates the learning journey of</p><h2>{name.trim()}</h2><p>for completing the self-reported lessons in</p><h3>{title}</h3><p>{count} lessons · Free learning in Kannada</p><p className="certificate-footer">ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯೋಣ · ಭವಿಷ್ಯ ನಿರ್ಮಿಸೋಣ</p><small>This is a self-reported learning record, not a verified credential.</small></div></section>}
    </>
  );
}
