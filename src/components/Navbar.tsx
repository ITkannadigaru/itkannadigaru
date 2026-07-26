"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";

const links = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "Roadmaps", href: "#roadmaps" },
  { label: "Playlists", href: "#playlists" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-yellow">&lt;/&gt;</span>
          <span>ITKannadigaru</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-grey md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-yellow">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          className="hidden rounded-full bg-yellow px-5 py-2 text-sm font-semibold text-background transition hover:brightness-110 md:inline-block"
        >
          Subscribe
        </a>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-white/10 bg-background px-6 py-6 text-grey md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
