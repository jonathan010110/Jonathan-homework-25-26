<script>
  import ProgressRing from "../components/ProgressRing.svelte";

  let { onNavigate = () => {} } = $props();

  const todayExercises = 3 / 6;
  const totalBreathTime = 12 / 20;
  const lastSession = 0.82;
</script>

<div class="screen-shell screen-enter flex flex-col">
  <h2 class="mt-8 text-[35px] font-semibold text-[rgba(96,32,42,0.92)]">Atmen Statistik</h2>

  <div class="mt-10">
    <div class="glass-card p-5">
      <div class="flex items-center justify-between">
        <ProgressRing progress={todayExercises} label="" color="#bda4e4" size={56} stroke={4} />
        <span class="text-[10px] text-amber-50/85">Heutige Ubungen: 3</span>
      </div>

      <div class="mt-8 flex items-center justify-between">
        <span class="text-[10px] text-amber-50/85">Gesamte Atemzeit: 12 min</span>
        <ProgressRing progress={totalBreathTime} label="" color="#98c2f0" size={28} stroke={3} />
      </div>

      <div class="mt-10 flex items-center justify-between">
        <ProgressRing progress={lastSession} label="" color="#8d84d9" size={34} stroke={3} />
        <span class="text-[10px] text-amber-50/85">Letzte Session<br />Heute - 09:54</span>
      </div>
    </div>
  </div>

  <div class="mt-auto mb-6">
    <button class="warm-pill px-4 py-2" onclick={() => onNavigate("dashboard")}>Zuruck</button>
  </div>
</div>
