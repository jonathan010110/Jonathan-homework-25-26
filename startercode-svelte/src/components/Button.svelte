<script lang="ts">
  import type { Snippet } from "svelte";

  type ButtonVariant = "primary" | "secondary" | "ghost";

  let {
    type = "button" as "button" | "submit" | "reset",
    variant = "primary" as ButtonVariant,
    fullWidth = false,
    disabled = false,
    onClick = (_event: MouseEvent) => {},
    children
  }: {
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
    children?: Snippet;
  } = $props();

  const tone: Record<ButtonVariant, string> = {
    primary: "from-amber-100/25 to-red-800/35",
    secondary: "from-white/12 to-red-900/30",
    ghost: "from-white/8 to-white/2"
  };
</script>

<button
  {type}
  {disabled}
  class={`glass-button px-5 py-2.5 text-[11px] font-medium tracking-[0.02em] bg-gradient-to-br ${tone[variant] ?? tone.primary} ${fullWidth ? "w-full" : ""}`}
  onclick={onClick}
>
  {@render children?.()}
</button>
