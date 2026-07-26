import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Playlists from "@/components/Playlists";

function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section
      id={id}
      className="mx-auto max-w-7xl px-6 py-24 text-center text-grey"
    >
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4">Content coming soon.</p>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Placeholder id="about" title="About Me" />
      <Placeholder id="courses" title="Courses" />
      <Placeholder id="roadmaps" title="Learning Roadmaps" />
      <Playlists />
      <Placeholder id="projects" title="Projects" />
      <Placeholder id="community" title="Community" />
      <Placeholder id="contact" title="Contact" />
      <footer className="border-t border-white/10 px-6 py-10 text-center text-grey">
        <p className="font-mono font-bold text-yellow">
          &lt;/&gt; ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯೋಣ ಭವಿಷ್ಯ ನಿರ್ಮಿಸೋಣ &lt;/&gt;
        </p>
        <p className="mt-4 text-sm">
          © 2026 Manoj Krishnappa · ITKannadigaru · Built with ❤️ in Karnataka.
        </p>
      </footer>
    </main>
  );
}
