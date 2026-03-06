<script>
  import { user } from "../stores/user";

  let { onNavigate = () => {} } = $props();
  const navItems = [
    { id: "practice", label: "Atmung Praxis" },
    { id: "guide", label: "Atmung Anleitung" },
    { id: "statistics", label: "Atmen Statistik" },
    { id: "sleep", label: "Schlaf" }
  ];
</script>

<div class="screen-shell screen-enter flex flex-col">
  <span class="mini-profile">◌</span>
  <p class="mt-14 text-[11px] text-[rgba(108,64,58,0.9)]">Guten Morgen {$user.name}</p>

  <div class="mt-10">
    <div class="flex flex-wrap gap-2">
      {#each navItems as item}
        <button
          class="warm-pill min-h-8 px-4 py-2"
          onclick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      {/each}
    </div>
  </div>

  <div class="mt-auto mb-8 px-2">
    <p class="text-[14px] text-amber-50/88">Deine Streak: <span class="font-semibold text-amber-50">{$user.streak} 🔥</span></p>
  </div>
</div>
