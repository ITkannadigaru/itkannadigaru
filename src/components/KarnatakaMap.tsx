"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { assetPath } from "@/lib/assets";

export default function KarnatakaMap() {
  return (
    <motion.div
      className="relative mx-auto h-full w-full max-w-[460px]"
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="animate-map-glow relative h-full w-full"
        style={{ filter: "drop-shadow(0 0 45px rgba(255,209,0,0.3))" }}
      >
        <Image
          src={assetPath("/images/karnataka-map-glow.png")}
          alt="Glowing golden Karnataka map made of circuit-board traces, fading into a red glow at the base"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Centered Kannada + English identity text */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <p className="animate-fade-in-up animate-glow-pulse font-kannada text-3xl font-extrabold leading-snug text-yellow sm:text-4xl lg:text-5xl">
          ಕನ್ನಡಿಗನಿಂದ
          <br />
          ಕನ್ನಡಿಗರಿಗಾಗಿ
        </p>
        <span className="mt-5 h-px w-16 bg-yellow/60" />
        <p className="animate-fade-in-up mt-5 text-sm font-medium tracking-wide text-white sm:text-base">
          By a Kannadiga,
          <br />
          For Kannadigas.
        </p>
      </div>
    </motion.div>
  );
}
