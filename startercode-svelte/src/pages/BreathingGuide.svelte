<script>
  let { onNavigate = () => {} } = $props();
</script>

<div class="screen-shell screen-enter flex flex-col">
  <h2 class="mt-8 text-[35px] font-semibold text-[rgba(96,32,42,0.92)]">How to breath</h2>

  <div class="mt-10 rounded-[2px] border border-[rgba(249,231,213,0.35)] bg-[#caa175]/80 p-4 text-[10px] leading-relaxed text-[rgba(96,44,38,0.86)]">
    Start with a 4-4-4 cycle.
    <br />
    Inhale for 4 seconds.
    <br />
    Hold for 4 seconds.
    <br />
    Exhale for 4 seconds.
  </div>

  <div class="mt-auto mb-6">
    <button class="warm-pill px-4 py-2" onclick={() => onNavigate("dashboard")}>Zuruck</button>
  </div>
</div>
