<script>
  import Button from "../components/Button.svelte";
  import ProgressRing from "../components/ProgressRing.svelte";

  let { onNavigate = () => {} } = $props();
</script>

<div class="screen-shell screen-enter flex flex-col">
  <h2 class="mt-8 text-[35px] font-semibold text-[rgba(96,32,42,0.92)]">Schlaf</h2>

  <div class="mt-10 glass-card p-5">
    <p class="text-[10px] text-amber-100/76">Dein Schlaf heute</p>

    <div class="mt-6 flex items-center justify-center gap-5">
      <ProgressRing progress={0.7} label="" size={38} stroke={3} color="#d4b6f6" />
      <span class="text-[10px] text-amber-50/85">7h 30min</span>
    </div>

    <div class="mt-9 space-y-2.5 text-[10px] leading-relaxed text-amber-50/87">
      <p>Tiefschlaf :&nbsp;&nbsp;&nbsp;&nbsp;2h 10m</p>
      <p>Leichtschlaf :&nbsp;4h 50m</p>
      <p>Wachphasen :&nbsp;&nbsp;4x</p>
    </div>

    <div class="mt-9">
      <Button fullWidth>Schlaf session starten</Button>
    </div>
  </div>

  <div class="mt-auto mb-6">
    <button class="warm-pill px-4 py-2" onclick={() => onNavigate("dashboard")}>Zuruck</button>
  </div>
</div>
