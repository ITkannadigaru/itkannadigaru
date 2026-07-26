import { PlayCircle } from "lucide-react";
import { PLAYLISTS } from "@/lib/links";

export default function Playlists() {
  return (
    <section id="playlists" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          FREE Complete Playlists
        </h2>
        <p className="mt-3 text-grey">
          Full, free, project-based playlists — 100% in Kannada.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLAYLISTS.map((p) => (
          <div
            key={p.url}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-card/60 p-6 transition hover:border-yellow/50"
          >
            <div>
              <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-red/20 via-card to-yellow/10">
                <PlayCircle size={48} className="text-yellow" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-grey">{p.difficulty}</p>
            </div>
            <a
              href={p.url}
              target="_blank"
              className="mt-6 inline-block rounded-full bg-yellow px-5 py-2 text-center text-sm font-semibold text-background transition hover:brightness-110"
            >
              ▶ Watch Playlist
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
