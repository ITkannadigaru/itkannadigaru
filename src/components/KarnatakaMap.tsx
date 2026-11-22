import Image from "next/image";
import { assetPath } from "@/lib/assets";

export default function KarnatakaMap() {
  return (
    <div className="map-stage relative mx-auto h-full w-full max-w-[500px]">
      <div className="map-aura" aria-hidden="true" />
      <div className="map-orbit map-orbit-outer" aria-hidden="true" />
      <div className="map-orbit map-orbit-inner" aria-hidden="true" />
      <div className="map-floor" aria-hidden="true" />
      <div className="map-particles" aria-hidden="true">
        <span /><span /><span /><span /><span /><span /><span /><span />
      </div>
      <div className="map-float absolute inset-0">
        <Image
          src={assetPath("/images/karnataka-map-glow.png")}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 90vw, 500px"
          className="object-contain mix-blend-screen"
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="max-w-[74%] -translate-y-1">
            <p lang="kn" className="font-kannada text-xl font-extrabold leading-snug text-yellow [text-shadow:0_2px_16px_#000,0_0_24px_rgba(255,209,0,0.55)] sm:text-2xl">
              ಕನ್ನಡಿಗನಿಂದ
              <br />
              ಕನ್ನಡಿಗರಿಗಾಗಿ
            </p>
            <span className="mx-auto mt-3 block h-px w-12 bg-yellow/70" />
            <p className="mt-3 text-[10px] font-semibold tracking-wide text-white [text-shadow:0_2px_8px_#000] sm:text-xs">
              By a Kannadiga,<br />for Kannadigas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
