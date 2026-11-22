type Scheduler = {
  now: () => number;
  schedule: (callback: () => void, delay: number) => number;
  cancel: (timer: number) => void;
};

const browserScheduler: Scheduler = {
  now: () => performance.now(),
  schedule: (callback, delay) => window.setTimeout(callback, delay),
  cancel: (timer) => window.clearTimeout(timer),
};

export function createPlaybackTimer(onMinute: () => void, scheduler: Scheduler = browserScheduler) {
  let started: number | undefined;
  let timer: number | undefined;
  let playedMs = 0;
  let finished = false;

  function stop() {
    if (started !== undefined) playedMs += scheduler.now() - started;
    started = undefined;
    if (timer !== undefined) scheduler.cancel(timer);
    timer = undefined;
  }

  return {
    setState(state: number) {
      if (finished) return;
      if (state !== 1) {
        stop();
        if (playedMs >= 60_000) {
          finished = true;
          onMinute();
        }
        return;
      }
      if (started !== undefined) return;
      started = scheduler.now();
      timer = scheduler.schedule(() => {
        stop();
        finished = true;
        onMinute();
      }, Math.max(0, 60_000 - playedMs));
    },
    dispose() {
      finished = true;
      stop();
    },
  };
}
