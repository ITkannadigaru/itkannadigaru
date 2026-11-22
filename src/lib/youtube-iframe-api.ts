type PlayerEvent = { data: number };
export type YouTubePlayer = { destroy: () => void; getPlayerState: () => number };
type YouTubeApi = {
  Player: new (element: HTMLIFrameElement, options: {
    events: {
      onReady: (event: { target: YouTubePlayer }) => void;
      onStateChange: (event: PlayerEvent) => void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let pending: Promise<YouTubeApi> | undefined;

export function loadYouTubeIframeApi(): Promise<YouTubeApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (pending) return pending;

  pending = new Promise<YouTubeApi>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    const script = existing ?? document.createElement("script");
    const cleanup = () => {
      window.clearTimeout(timer);
      script.removeEventListener("error", onError);
      if (window.onYouTubeIframeAPIReady === onReady) window.onYouTubeIframeAPIReady = previous;
    };
    const onError = () => {
      cleanup();
      if (!existing) script.remove();
      reject(new Error("YouTube player API unavailable"));
    };
    const onReady = () => {
      cleanup();
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube player API did not initialize"));
    };
    window.onYouTubeIframeAPIReady = onReady;
    script.addEventListener("error", onError);
    const timer = window.setTimeout(onError, 15000);
    if (!existing) {
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  }).catch((error: unknown) => {
    pending = undefined;
    throw error;
  });
  return pending;
}
