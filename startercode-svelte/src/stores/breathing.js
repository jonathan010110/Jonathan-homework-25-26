import { derived, writable } from "svelte/store";

const phases = [
  { key: "inhale", label: "Einatmen", duration: 4 },
  { key: "hold", label: "Halten", duration: 4 },
  { key: "exhale", label: "Ausatmen", duration: 4 }
];

function createBreathingStore() {
  const state = writable({
    running: false,
    phaseIndex: 0,
    secondsInPhase: 0,
    cycles: 0
  });

  /** @type {ReturnType<typeof setInterval> | null} */
  let timer = null;

  const tick = () => {
    state.update((current) => {
      if (!current.running) {
        return current;
      }

      const activePhase = phases[current.phaseIndex];
      const nextSeconds = current.secondsInPhase + 1;

      if (nextSeconds < activePhase.duration) {
        return { ...current, secondsInPhase: nextSeconds };
      }

      const nextPhase = (current.phaseIndex + 1) % phases.length;
      const nextCycle = nextPhase === 0 ? current.cycles + 1 : current.cycles;

      return {
        ...current,
        phaseIndex: nextPhase,
        secondsInPhase: 0,
        cycles: nextCycle
      };
    });
  };

  return {
    subscribe: state.subscribe,
    start: () => {
      state.update((current) => ({ ...current, running: true }));
      if (!timer) {
        timer = setInterval(tick, 1000);
      }
    },
    pause: () => {
      state.update((current) => ({ ...current, running: false }));
    },
    reset: () => {
      state.set({ running: false, phaseIndex: 0, secondsInPhase: 0, cycles: 0 });
    },
    destroy: () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    },
    phases
  };
}

export const breathing = createBreathingStore();

export const breathingView = derived(breathing, ($breathing) => {
  const phase = phases[$breathing.phaseIndex];
  return {
    ...$breathing,
    phase,
    secondsLeft: phase.duration - $breathing.secondsInPhase,
    progressInPhase: $breathing.secondsInPhase / phase.duration
  };
});
