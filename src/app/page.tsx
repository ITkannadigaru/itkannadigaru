import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, Play, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";
import { lessons } from "@/lib/python-lessons";
import AIRoadmap from "@/components/AIRoadmap";
import { catalog } from "@/lib/catalog";
import KarnatakaMap from "@/components/KarnatakaMap";
import ContinueLearning from "@/components/ContinueLearning";
import { getCourseLessons } from "@/lib/course-lessons";
import AccountLink from "@/components/AccountLink";

const resumeCourses = [
  { slug: "python-for-ai", title: "Python for AI", lessons: lessons.map((lesson) => ({ id: lesson.video, title: lesson.title, label: `Day ${lesson.day}` })) },
  ...catalog.map((course) => ({
    slug: course.slug, title: course.title,
    lessons: getCourseLessons(course).map((lesson) => ({ id: lesson.id, title: lesson.title, label: lesson.label })),
  })),
];

export default function Home() {
  return (
    <main>
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-5 sm:gap-4 sm:px-8" aria-label="Main navigation">
          <a href="#home" className="text-base font-extrabold sm:text-lg"><span className="text-yellow">&lt;/&gt;</span> ITKannadigaru</a>
          <div className="hidden items-center gap-8 text-sm text-grey md:flex"><a href="#roadmap" className="hover:text-white">Roadmap</a><a href="#courses" className="hover:text-white">Start learning</a><a href="#about" className="hover:text-white">Our story</a></div>
          <div className="flex min-w-0 items-center gap-3"><AccountLink /><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:border-yellow hover:text-yellow sm:inline-flex">YouTube ↗</a></div>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden border-b border-white/5">
        <div className="bg-circuit-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="hero-atmosphere absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-yellow/20 bg-yellow/5 px-4 py-2 text-xs font-bold tracking-wider text-yellow"><Sparkles size={14} /> LEARN TECH IN KANNADA</p>
            <p className="mt-6 font-kannada text-lg font-semibold text-white">ನಮಸ್ಕಾರ 👋 I&apos;m Manoj, founder of ITKannadigaru.</p>
            <h1 lang="kn" className="font-kannada mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">ಕನಸು ನಿಮ್ಮದು.<br /><span className="text-yellow">ದಾರಿ ನಮ್ಮದು</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-grey">From your first line of Python to building with AI. Learn step by step, with free Kannada videos and beginner-friendly notes.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#courses" className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3.5 font-bold text-background transition hover:brightness-110">Start your journey <ArrowRight size={18} /></a>
              <a href="#roadmap" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold hover:border-yellow">Explore the roadmap <ArrowDown size={16} /></a>
            </div>
            <p className="mt-8 text-sm text-grey">✦ Free to learn <span className="mx-3 text-white/20">|</span> Kannada videos <span className="mx-3 text-white/20">|</span> Learn at your pace</p>
          </div>
          <div className="h-[440px] sm:h-[560px] lg:h-[660px]">
            <KarnatakaMap />
          </div>
        </div>
      </section>

      <AIRoadmap />

      <section id="courses" className="border-y border-white/5 bg-[#0b1020]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-yellow">START YOUR COURSE</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Small steps. Real skills.</h2>
          <p className="mt-3 text-grey">Choose a course, follow its roadmap, then watch, read, practise and build.</p>
          <ContinueLearning courses={resumeCourses} />
          <div className="mt-10 grid overflow-hidden rounded-3xl border border-yellow/20 bg-card lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-[#121c31] to-yellow/10">
              <div className="bg-circuit-grid absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${lessons[0].video}/hqdefault.jpg)` }} aria-hidden="true" />
              <div className="relative rounded-full bg-black/70 px-4 py-2 font-mono text-sm tracking-widest text-yellow">PYTHON → AI</div>
            </div>
            <div className="p-7 sm:p-10"><div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-yellow/10 px-3 py-1 text-yellow">BEGINNER FRIENDLY</span><span className="rounded-full bg-white/5 px-3 py-1 text-grey">{lessons.length} VIDEO LESSONS</span></div><h3 className="mt-5 text-2xl font-extrabold">Python for AI</h3><p className="mt-3 max-w-xl leading-7 text-grey">Build your Python foundation, from variables to applications and data validation. Follow each day with a Kannada video, readable notes and a practice task.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/learn/python-for-ai" className="inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-bold text-background hover:brightness-110">Start course <ArrowRight size={17} /></Link><Link href="/learn/python-for-ai#lessons" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold hover:border-yellow"><Play size={16} /> View lessons</Link></div></div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{catalog.map((item) => <Link key={item.slug} href={`/learn/${item.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 transition hover:border-yellow/50"><div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${item.videos[0].id}/hqdefault.jpg)` }} aria-hidden="true" /><div className="p-6"><p className="text-xs font-bold tracking-widest text-yellow">{item.label} · {item.videos.length} LESSONS</p><h3 className="mt-4 text-xl font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-grey">{item.desc}</p><p className="mt-3 text-xs text-grey">Notes · Quiz · Assignment · Certificate</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">Start course <ArrowRight size={14} /></span></div></Link>)}</div>
          <p className="mt-6 text-sm text-grey">More videos and series on <a className="text-yellow underline underline-offset-4" href={`${SOCIAL_LINKS.youtube}/playlists`} target="_blank" rel="noopener noreferrer">the YouTube channel</a>.</p>
        </div>
      </section>

      <section id="about" className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center"><div><p className="text-xs font-bold tracking-[0.2em] text-yellow">ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯೋಣ</p><h2 className="mt-3 text-3xl font-bold">Created by Manoj, for curious learners.</h2><p className="mt-4 max-w-2xl leading-7 text-grey">ITKannadigaru makes technology more approachable through practical, free learning in Kannada. Watch, practise, and build at your own pace.</p></div><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-6 py-3 font-semibold hover:border-yellow md:self-center"><Play size={16} /> Visit the channel</a></section>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-grey"><BookOpen size={16} className="mr-2 inline text-yellow" /> ITKannadigaru · ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯೋಣ, ಭವಿಷ್ಯ ನಿರ್ಮಿಸೋಣ</footer>
    </main>
  );
}
