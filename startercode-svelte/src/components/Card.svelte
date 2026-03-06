<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title = "",
    subtitle = "",
    padded = true,
    children
  }: {
    title?: string;
    subtitle?: string;
    padded?: boolean;
    children?: Snippet;
  } = $props();
</script>

<section class={`glass-card ${padded ? "p-5" : ""}`}>
  {#if title}
    <h3 class="text-base font-semibold tracking-wide text-amber-50">{title}</h3>
  {/if}

  {#if subtitle}
    <p class="mt-1 text-xs text-amber-100/80">{subtitle}</p>
  {/if}

  <div class={title || subtitle ? "mt-4" : ""}>
    {@render children?.()}
  </div>
</section>
