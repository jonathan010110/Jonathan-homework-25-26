<script>
  import Button from "../components/Button.svelte";

  let { onNavigate = () => {} } = $props();
</script>

<div class="screen-shell screen-enter flex flex-col items-center text-center">
  <div class="mt-14 rounded-full border border-amber-100/20 bg-amber-50/8 p-4">
    <div class="h-7 w-7 rounded-full border border-amber-50/30"></div>
  </div>

  <h1 class="mt-12 max-w-[150px] text-[16px] font-semibold leading-tight text-[rgba(104,62,56,0.82)]">Welcome to RelaxGame</h1>
  <p class="mt-3 max-w-[170px] text-[10px] leading-relaxed text-[rgba(238,216,197,0.64)]">Take one gentle breath and begin your ritual.</p>

  <div class="mt-8 flex w-[90px] flex-col gap-3">
    <Button fullWidth onClick={() => onNavigate("login")}>Login</Button>
    <Button fullWidth variant="secondary" onClick={() => onNavigate("login")}>Register</Button>
  </div>
</div>
