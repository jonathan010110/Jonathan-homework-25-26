<script>
  let { onNavigate = () => {} } = $props();

  const categories = [
    "Physical Relax",
    "Mind Focus",
    "Meditation",
    "Body Focus",
    "Simulation",
    "Alternative"
  ];
</script>

<div class="screen-shell screen-enter flex flex-col">
  <span class="mini-profile">◌</span>
  <h2 class="mt-18 text-[12px] font-medium tracking-[0.01em] text-[rgba(102,58,53,0.86)]">Atmung Praxis</h2>

  <div class="mt-10 grid grid-cols-2 gap-3 px-2">
    {#each categories as category}
      <button class="warm-pill min-h-[64px] rounded-[999px] px-3 py-4 text-[10px] leading-tight" onclick={() => onNavigate("session")}>
        {category}
      </button>
    {/each}
  </div>

  <div class="mt-auto mb-6">
    <button class="warm-pill px-4 py-2" onclick={() => onNavigate("dashboard")}>Zuruck</button>
  </div>
</div>
