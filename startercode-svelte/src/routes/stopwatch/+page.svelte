<script lang="ts">
let duration = 60;
let elapsed = 0;
let running = false;
let raf = 0 as number;
let startTime = 0;

function tick() {
  const now = performance.now();
  elapsed = (now - startTime) / 1000;
  if (elapsed >= duration) {
    elapsed = duration;
    stop();
  } else {
    raf = requestAnimationFrame(tick);
  }
}

function start() {
  if (duration <= 0) return;
  if (!running) {
    running = true;
    startTime = performance.now() - elapsed * 1000;
    raf = requestAnimationFrame(tick);
  }
}

function stop() {
  if (running) {
    running = false;
    cancelAnimationFrame(raf);
  }
}

function reset() {
  stop();
  elapsed = 0;
}

function onDurationChange(e: Event) {
  const input = e.target as HTMLInputElement;
  duration = Number(input.value);
  reset();
}

$: remaining = Math.max(0, duration - elapsed);
$: progress = duration > 0 ? Math.min(elapsed / duration, 1) : 0;
$: warn = progress >= 0.5;

const radius = 120;
const cx = 150;
const cy = 150;
const circumference = 2 * Math.PI * radius;
</script>

<main class="page">
  <div class="stopwatch">
    <div class="controls-row">
      <div class="label">Set Duration (0-300s)</div>
      <div class="value">{Math.round(duration)} s</div>
    </div>
    <input class="slider" type="range" min="0" max="300" bind:value={duration} on:input={onDurationChange} />

    <svg viewBox="0 0 300 300" class="ring" aria-hidden>
      <circle cx="{cx}" cy="{cy}" r="{radius}" stroke="rgba(255,255,255,0.2)" stroke-width="18" fill="none" />
      <circle
        cx="{cx}"
        cy="{cy}"
        r="{radius}"
        stroke-linecap="round"
        stroke-width="18"
        fill="none"
        stroke={warn ? '#ff6b6b' : 'rgba(255,255,255,0.8)'}
        stroke-dasharray="{circumference}"
        stroke-dashoffset="{circumference * (1 - progress)}"
        transform="rotate(-90 {cx} {cy})"
      />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="center-number">{Math.ceil(remaining)}</text>
    </svg>

    <div class="button-row">
      <button class="btn start" on:click={start}>START</button>
      <button class="btn stop" on:click={stop}>STOP</button>
      <button class="btn reset" on:click={reset}>RESET</button>
    </div>
  </div>
</main>

<style>
  :global(body) { margin: 0; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; }
  
  .page {
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #e9c996 0%, #7a2b26 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    margin: 0;
  }

  .stopwatch { 
    max-width: 480px; 
    width: 100%;
    text-align: center;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(25px);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 24px;
    padding: 3rem 2.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .controls-row { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin: 0 0 1.5rem 0;
    gap: 1.5rem;
  }

  .label { 
    font-size: 1.05rem; 
    color: rgba(255, 255, 255, 0.85);
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .value { 
    font-size: 1.25rem; 
    font-weight: 800;
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .slider { 
    width: 100%; 
    margin: 1.5rem 0;
    height: 8px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(255, 255, 255, 0.4);
    transition: all 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(255, 255, 255, 0.4);
  }

  .ring { 
    width: 280px; 
    height: 280px; 
    display: block; 
    margin: 2rem auto;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2));
  }

  .center-number { 
    font-size: 3.5rem; 
    fill: rgba(255, 255, 255, 0.95); 
    font-weight: 900;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .button-row { 
    display: flex; 
    gap: 1rem; 
    justify-content: center; 
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .btn { 
    padding: 14px 28px; 
    font-size: 1rem;
    font-weight: 700;
    border-radius: 12px; 
    cursor: pointer; 
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 48px;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.5px;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: left 0.3s ease;
    z-index: 0;
  }

  .btn:hover::before {
    left: 100%;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.15), 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  .btn:active { 
    transform: translateY(-1px);
    box-shadow: inset 0 2px 8px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .btn:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  .btn.start { 
    background: rgba(100, 150, 255, 0.25);
    border-color: rgba(100, 150, 255, 0.5);
  }

  .btn.start:hover {
    background: rgba(100, 150, 255, 0.35);
    border-color: rgba(100, 150, 255, 0.7);
  }

  .btn.reset { 
    background: rgba(255, 120, 120, 0.25);
    border-color: rgba(255, 120, 120, 0.5);
  }

  .btn.reset:hover {
    background: rgba(255, 120, 120, 0.35);
    border-color: rgba(255, 120, 120, 0.7);
  }

  @media(max-width: 640px) {
    .stopwatch {
      padding: 2rem 1.5rem;
      max-width: 100%;
    }
    .ring {
      width: 240px;
      height: 240px;
    }
    .center-number {
      font-size: 2.8rem;
    }
    .button-row {
      gap: 0.75rem;
    }
    .btn {
      padding: 12px 20px;
      font-size: 0.9rem;
      flex: 1;
      min-width: 80px;
    }
  }
</style>
