import { getCourseProject } from "@/lib/course-projects";

export default function CourseProject({ slug }: { slug: string }) {
  const project = getCourseProject(slug);
  return (
    <section id="course-project" aria-labelledby="project-title" className="mx-auto max-w-7xl scroll-mt-6 px-5 pb-14 sm:px-8">
      <div className="rounded-3xl border border-yellow/25 bg-gradient-to-br from-card to-blue-950/20 p-6 sm:p-8">
        <p className="text-xs font-bold tracking-[0.2em] text-yellow">FINAL PROJECT / BUILD YOUR PORTFOLIO</p>
        <h2 id="project-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">{project.title}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-grey">{project.goal}</p>
        <p className="mt-3 text-xs leading-6 text-grey">Original companion project, not an exact video reconstruction. It is self-reviewed and does not change certificate eligibility.</p>
        <details className="mt-6 rounded-2xl border border-white/10 bg-background/40 p-5">
          <summary className="cursor-pointer font-bold text-yellow">Open project brief</summary>
          <p className="mt-5 text-sm leading-7 text-grey"><strong className="text-white">Before starting:</strong> {project.prerequisites}</p>
          <h3 className="mt-7 text-lg font-bold">Plan → Build → Verify → Explain</h3>
          <ol className="mt-4 grid gap-4 md:grid-cols-2">
            {project.steps.map((step, index) => <li key={step.title} className="min-w-0 rounded-2xl border border-white/10 p-4">
              <p className="text-xs font-bold text-yellow">STEP {index + 1}</p>
              <h4 className="mt-2 font-bold">{step.title}</h4>
              <p className="mt-3 text-sm leading-7 text-grey">{step.detail}</p>
            </li>)}
          </ol>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-white/10 p-4"><h3 className="font-bold">Practice fixture / scenario</h3><pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-grey">{project.fixture}</pre></div>
            <div className="min-w-0 rounded-2xl border border-green-300/20 bg-green-300/5 p-4"><h3 className="font-bold text-green-200">Expected demonstration</h3><pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-grey">{project.expected}</pre><p className="mt-2 text-xs leading-5 text-grey">A target to verify yourself, not a completed run.</p></div>
          </div>
          <h3 className="mt-7 text-lg font-bold">Acceptance checks</h3>
          <ul className="mt-4 space-y-3">{project.checks.map((check) => <li key={check.scenario} className="rounded-xl border border-white/10 p-4"><h4 className="text-sm font-bold">{check.scenario}</h4><p className="mt-2 text-sm leading-6 text-grey">{check.expected}</p></li>)}</ul>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div><h3 className="text-lg font-bold">What to submit to your portfolio</h3><ul className="mt-3 list-disc space-y-3 pl-5 text-sm leading-7 text-grey">{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-3 text-xs leading-5 text-grey">Keep these locally or in your own reviewed repository. This website does not upload or grade your work.</p></div>
            <div><h3 className="text-lg font-bold">Troubleshooting practice</h3>{project.troubleshooting.map((item) => <details key={item.symptom} className="mt-3 rounded-xl border border-orange-300/20 p-4"><summary className="cursor-pointer text-sm font-bold text-orange-200">{item.symptom}</summary><p className="mt-3 text-sm leading-7 text-grey">{item.check}</p></details>)}</div>
          </div>
          <p className="mt-7 rounded-2xl border border-orange-300/20 bg-orange-300/5 p-4 text-sm leading-7 text-orange-100"><strong>Lab safety:</strong> {project.safety}</p>
        </details>
      </div>
    </section>
  );
}
