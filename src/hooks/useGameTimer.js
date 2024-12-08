import { createSignal, onCleanup } from 'solid-js';

function useGameTimer({ isRunning, gameIntervals }) {
  const [now, setNow] = createSignal(Date.now());
  let uiTimer = null;

  const startUITimer = () => {
    uiTimer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
  };

  const getTimeElapsed = () => {
    now();
    let total = 0;
    for (const interval of gameIntervals()) {
      if (interval.endTime) {
        total += interval.endTime - interval.startTime;
      } else {
        total += isRunning() ? now() - interval.startTime : 0;
      }
    }
    return Math.floor(total / 1000);
  };

  onCleanup(() => {
    if (uiTimer !== null) {
      clearInterval(uiTimer);
    }
  });

  return {
    now,
    startUITimer,
    getTimeElapsed,
  };
}

export default useGameTimer;