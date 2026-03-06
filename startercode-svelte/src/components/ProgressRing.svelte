<script>
  let {
    size = 92,
    stroke = 8,
    progress = 0,
    color = "#9ecfff",
    label = ""
  } = $props();

  const radius = $derived((size - stroke) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  const clampedProgress = $derived(Math.max(0, Math.min(progress, 1)));
  const offset = $derived(circumference * (1 - clampedProgress));
</script>

<div class="relative inline-grid place-items-center" style={`width:${size}px;height:${size}px;`}>
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} class="-rotate-90">
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke="var(--ring-track)"
      stroke-width={stroke}
    />
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke={color}
      stroke-width={stroke}
      stroke-linecap="round"
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
      style="transition: stroke-dashoffset 420ms ease;"
    />
  </svg>

  {#if label}
    <span class="absolute text-[11px] font-medium text-amber-50/90">{label}</span>
  {/if}
</div>
