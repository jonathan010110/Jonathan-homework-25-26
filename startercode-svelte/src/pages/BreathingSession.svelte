<script>
  import { onDestroy } from "svelte";
  import Button from "../components/Button.svelte";
  import BreathCircle from "../components/BreathCircle.svelte";
  import { breathing, breathingView } from "../stores/breathing";

  let { onNavigate = () => {} } = $props();

  const toggle = () => {
    if ($breathingView.running) {
      breathing.pause();
    } else {
      breathing.start();
    }
  };

  const stop = () => {
    breathing.reset();
    onNavigate("dashboard");
  };

  onDestroy(() => {
    breathing.pause();
  });
</script>

<div class="screen-shell screen-enter flex flex-col">
  <span class="mini-profile">◌</span>
  <div class="mb-4 mt-10 flex items-center justify-center">
    <h2 class="text-[12px] font-medium text-[rgba(112,63,57,0.88)]">Einatmen</h2>
  </div>

  <div class="mt-3 flex flex-1 items-center justify-center">
    <BreathCircle
      phase={$breathingView.phase.key}
      phaseLabel={$breathingView.phase.label}
      secondsLeft={$breathingView.secondsLeft}
      size={260}
    />
  </div>

  <div class="glass-card mt-1 flex items-center justify-between p-3 text-[10px] text-amber-100/88">
    <span>Zyklus: {$breathingView.cycles + 1}</span>
    <span>4s inhale / 4s hold / 4s exhale</span>
  </div>

  <div class="mt-3 flex gap-3">
    <Button fullWidth onClick={toggle}>{$breathingView.running ? "Pause" : "Start"}</Button>
    <Button fullWidth variant="secondary" onClick={stop}>Stop</Button>
  </div>
</div>
