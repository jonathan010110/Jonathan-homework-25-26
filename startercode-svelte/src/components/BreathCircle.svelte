<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  let {
    phase = "inhale",
    phaseLabel = "Einatmen",
    secondsLeft = 4,
    size = 248
  } = $props();

  const scale = tweened(0.9, { duration: 650, easing: cubicInOut });

  $effect(() => {
    if (phase === "inhale") {
      scale.set(1.2, { duration: 4000, easing: cubicInOut });
    } else if (phase === "hold") {
      scale.set(1.2, { duration: 200, easing: cubicInOut });
    } else {
      scale.set(0.9, { duration: 4000, easing: cubicInOut });
    }
  });

  /** @param {number} dot */
  const isActiveDot = (dot) => {
    if (phase === "inhale") return dot === 0;
    if (phase === "hold") return dot === 1;
    return dot === 2;
  };
</script>

<div class="flex flex-col items-center gap-4">
  <svg width={size} height={size} viewBox="0 0 260 260" class="overflow-visible">
    <g transform={`translate(130 130) scale(${$scale}) translate(-130 -130)`}>
      <circle cx="130" cy="130" r="102" fill="url(#breathGrad)" opacity="0.88" />
      <circle cx="130" cy="130" r="102" fill="none" stroke="rgba(255,245,235,0.5)" stroke-width="2" />
      <circle cx="130" cy="130" r="82" fill="none" stroke="rgba(145,203,255,0.65)" stroke-width="6" />
    </g>

    <defs>
      <radialGradient id="breathGrad" cx="50%" cy="35%" r="80%">
        <stop offset="0%" stop-color="#d7ad8f" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#7c3a34" stop-opacity="0.9" />
      </radialGradient>
    </defs>
  </svg>

  <div class="-mt-28 flex flex-col items-center gap-3">
    <p class="text-base font-semibold tracking-wide text-amber-50">{phaseLabel}</p>
    <div class="flex gap-2">
      {#each [0, 1, 2] as dot}
        <span
          class={`h-2.5 w-2.5 rounded-full border border-amber-50/40 ${isActiveDot(dot) ? "bg-amber-50" : "bg-transparent"}`}
        ></span>
      {/each}
    </div>
    <p class="text-xs tracking-[0.18em] text-amber-100/80">{secondsLeft}s</p>
  </div>
</div>
