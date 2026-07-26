"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaGithub, FaTelegram, FaInstagram, FaLinkedin, FaAws } from "react-icons/fa";
import { FaPython, FaDocker, FaJenkins } from "react-icons/fa6";
import {
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiLangchain,
} from "react-icons/si";
import { Brain, Boxes } from "lucide-react";
import Image from "next/image";
import { assetPath } from "@/lib/assets";
import { SOCIAL_LINKS } from "@/lib/links";
import KarnatakaMap from "@/components/KarnatakaMap";

// Deterministic "binary rain" columns for the hero background (fixed
// positions/content so server and client render identically).
const BINARY_COLUMNS = [
  { left: 4, top: 12, text: "01001\n10110\n00101\n11010" },
  { left: 12, top: 55, text: "10110\n01001\n11010\n00101" },
  { left: 90, top: 8, text: "11010\n00101\n01001\n10110" },
  { left: 95, top: 60, text: "00101\n11010\n10110\n01001" },
  { left: 82, top: 35, text: "01110\n10011\n01001\n10110" },
];

const roleBadges = [
  { label: "DevOps Engineer", color: "#2563EB" },
  { label: "AI Engineer", color: "#7C3AED" },
  { label: "Cloud Engineer", color: "#FF9900" },
];

const featureBadges = ["▶ Project Based", "★ Practical", "✓ Job Ready", "◎ Free in Kannada"];

const socialIcons = [
  { href: SOCIAL_LINKS.youtube, Icon: FaYoutube, bg: "#C8102E" },
  { href: SOCIAL_LINKS.telegram, Icon: FaTelegram, bg: "#2563EB" },
  { href: SOCIAL_LINKS.github, Icon: FaGithub, bg: "#111827" },
  { href: SOCIAL_LINKS.instagram, Icon: FaInstagram, bg: "#C8102E" },
  { href: SOCIAL_LINKS.linkedin, Icon: FaLinkedin, bg: "#2563EB" },
];

const techHex = [
  { label: "Python", Icon: FaPython, color: "#FFD100" },
  { label: "Kubernetes", Icon: SiKubernetes, color: "#2563EB" },
  { label: "AWS", Icon: FaAws, color: "#FF9900" },
  { label: "Docker", Icon: FaDocker, color: "#2563EB" },
  { label: "Terraform", Icon: SiTerraform, color: "#7C3AED" },
  { label: "Jenkins", Icon: FaJenkins, color: "#C8102E" },
  { label: "GitHub Actions", Icon: SiGithubactions, color: "#9CA3AF" },
  { label: "Prometheus", Icon: SiPrometheus, color: "#C8102E" },
  { label: "Grafana", Icon: SiGrafana, color: "#FF9900" },
  { label: "LangChain", Icon: SiLangchain, color: "#22C55E" },
  { label: "AI", Icon: Brain, color: "#7C3AED" },
  { label: "MCP", Icon: Boxes, color: "#2563EB" },
];

const hexClip = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

type LinePos = { x1: number; y1: number; x2: number; y2: number };

function TechEcosystem() {
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const hexRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lines, setLines] = useState<LinePos[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function measure() {
      const section = sectionRef.current;
      const map = mapWrapRef.current;
      if (!section || !map) return;
      const sectionRect = section.getBoundingClientRect();
      const mapRect = map.getBoundingClientRect();

      const originX = mapRect.right - sectionRect.left;
      const originY = mapRect.top + mapRect.height / 2 - sectionRect.top;

      const nextLines = hexRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x1: originX,
          y1: originY,
          x2: r.left + r.width / 2 - sectionRect.left,
          y2: r.top + r.height / 2 - sectionRect.top,
        };
      });

      setLines(nextLines.filter((l): l is LinePos => l !== null));
      setSize({ w: sectionRect.width, h: sectionRect.height });
    }

    measure();
    window.addEventListener("resize", measure);
    const id = window.setInterval(measure, 1000);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative grid h-full grid-cols-[35fr_25fr] items-center">
      {/* Circuit connector lines from the map to every tech icon */}
      {size.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
        >
          {lines.map((line, i) => {
            const isActive = hovered === i;
            const midX = (line.x1 + line.x2) / 2;
            return (
              <path
                key={i}
                d={`M ${line.x1} ${line.y1} Q ${midX} ${line.y1} ${line.x2} ${line.y2}`}
                fill="none"
                stroke={isActive ? techHex[i].color : "#9CA3AF"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.9 : 0.25}
                strokeDasharray="5 5"
                className="circuit-flow transition-all duration-300"
                style={
                  isActive
                    ? { filter: `drop-shadow(0 0 6px ${techHex[i].color})` }
                    : undefined
                }
              />
            );
          })}
        </svg>
      )}

      {/* Center: the Karnataka map — the primary hero element, no card/border */}
      <div ref={mapWrapRef} className="relative z-10 h-[62vh] min-h-[420px] max-h-[720px] w-full">
        <KarnatakaMap />
      </div>

      {/* Right: floating hexagonal tech ecosystem, connected back to Karnataka */}
      <div className="relative z-10 grid grid-cols-2 place-items-center gap-x-3 gap-y-5">
        {techHex.map(({ label, Icon, color }, i) => (
          <motion.div
            key={label}
            ref={(el) => {
              hexRefs.current[i] = el;
            }}
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            <div
              className="flex h-16 w-16 flex-col items-center justify-center gap-1 border bg-card/90 shadow-lg transition duration-300 hover:scale-110 sm:h-20 sm:w-20"
              style={{
                clipPath: hexClip,
                borderColor: hovered === i ? color : "rgba(255,255,255,0.1)",
                boxShadow: hovered === i ? `0 0 18px ${color}` : undefined,
              }}
            >
              <Icon size={18} color={color} />
              <span className="px-1 text-center text-[8px] font-medium leading-tight text-white">
                {label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24 pb-16"
    >
      {/* Layered background: circuit grid, binary rain, ambient glow, faint map watermark */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-circuit-grid opacity-40" />
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-red/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-yellow/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-blue/10 blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
          <div className="relative h-[85vh] w-[60vw] max-w-2xl">
            <Image
              src={assetPath("/images/karnataka-map-glow.png")}
              alt=""
              fill
              className="object-contain grayscale"
              aria-hidden
            />
          </div>
        </div>
        <div className="hidden select-none font-mono text-xs leading-5 text-yellow/20 sm:block">
          {BINARY_COLUMNS.map((col, i) => (
            <span
              key={i}
              className="absolute"
              style={{ left: `${col.left}%`, top: `${col.top}%`, whiteSpace: "pre-line" }}
            >
              {col.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[40fr_60fr]">
        {/* Left: Text content */}
        <div className="relative z-10">
          <p className="animate-fade-in-up text-3xl font-semibold text-white">
            ನಮಸ್ಕಾರ 👋
          </p>
          <h1 className="animate-fade-in-up mt-2 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-yellow via-orange-400 to-red bg-clip-text text-transparent">
              Manoj Krishnappa
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap gap-3">
            {roleBadges.map((r) => (
              <span
                key={r.label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-card px-4 py-1.5 text-sm font-medium text-white"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.label}
              </span>
            ))}
          </div>

          <p className="mt-4 text-xl font-bold text-yellow">
            Founder of ITKannadigaru
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-card/60 px-6 py-4 font-mono">
            <p className="text-xl font-bold text-yellow">
              &lt;/&gt; ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯೋಣ
            </p>
            <p className="text-xl font-bold text-yellow">
              ಭವಿಷ್ಯ ನಿರ್ಮಿಸೋಣ &lt;/&gt;
            </p>
          </div>

          <div className="mt-6 space-y-4 text-grey">
            <p>
              ನಮಸ್ಕಾರ! ನಾನು ಮನೋಜ್ ಕೆ, ಮತ್ತು ಇದು{" "}
              <span className="font-semibold text-white">
                ಐಟಿ ಕನ್ನಡಿಗರು (ITKannadigaru)
              </span>{" "}
              channel. ನಮ್ಮ ಚಾನೆಲ್‌ಗೆ ಸುಸ್ವಾಗತ!
            </p>
            <p>
              Tired of searching for quality, practical DevOps and Generative
              AI training in Kannada? You&apos;ve found the right place!
              ITKannadigaru breaks down complex tech into simple,
              project-based lessons to move you from beginner to
              professional.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {featureBadges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/10 bg-card px-4 py-1.5 text-sm font-medium text-white"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-red px-6 py-3 font-semibold text-white transition hover:brightness-110"
            >
              <FaYoutube size={18} /> Watch on YouTube
            </a>
            <a
              href="#courses"
              className="rounded-full bg-yellow px-6 py-3 font-semibold text-background transition hover:brightness-110"
            >
              📚 Explore Courses
            </a>
            <a
              href="#roadmaps"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-yellow hover:text-yellow"
            >
              🗺 Roadmaps
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-yellow hover:text-yellow"
            >
              <FaGithub size={18} /> GitHub
            </a>
          </div>

          <div className="mt-8">
            <p className="text-sm text-grey">Connect With Me:</p>
            <div className="mt-3 flex gap-3">
              {socialIcons.map(({ href, Icon, bg }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:brightness-110"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <TechEcosystem />
      </div>
    </section>
  );
}
